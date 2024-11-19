import { zodResolver } from "@hookform/resolvers/zod";
import { createContext, useContext, useEffect, useMemo } from "react";
import { UseFormHandleSubmit, useForm, useFormContext } from "react-hook-form";
import { toast } from "sonner";
import { mutate } from "swr";
import { z } from "zod";

import { Webhook, WebhookFormType, WebhookSchema } from "~/lib/model/webhooks";
import { WebhookApiService } from "~/lib/service/api/webhookApiService";

import { Form } from "~/components/ui/form";
import { useAsync } from "~/hooks/useAsync";

export type WebhookFormContextProps = {
    onSuccess?: () => void;
    webhook?: Webhook;
};

type WebhookFormContextType = {
    handleSubmit: ReturnType<UseFormHandleSubmit<WebhookFormType>>;
    isLoading: boolean;
    isEdit: boolean;
    hasToken: boolean;
    hasSecret: boolean;
};

const Context = createContext<WebhookFormContextType | null>(null);

const CreateSchema = WebhookSchema;
const EditSchema = WebhookSchema.omit({ token: true }).extend({
    secret: z.string(),
});

export function WebhookFormContextProvider({
    children,
    webhook,
    onSuccess,
}: WebhookFormContextProps & { children: React.ReactNode }) {
    const webhookId = webhook?.id;

    const updateWebhook = useAsync(WebhookApiService.updateWebhook, {
        onSuccess: () => {
            toast.success("Webhook updated");
        },
    });
    const createWebhook = useAsync(WebhookApiService.createWebhook, {
        onSuccess: () => {
            toast.success("Webhook created");
        },
    });

    const defaultValues = useMemo<WebhookFormType>(
        () => ({
            name: webhook?.name ?? "",
            description: webhook?.description ?? "",
            alias: webhook?.alias ?? "",
            workflow: webhook?.workflow ?? "",
            headers: webhook?.headers ?? [],
            secret: "",
            validationHeader: webhook?.validationHeader ?? "",
            token: "",
        }),
        [webhook]
    );

    const form = useForm<WebhookFormType>({
        resolver: zodResolver(webhookId ? EditSchema : CreateSchema),
        defaultValues,
    });

    useEffect(() => {
        form.reset(defaultValues);
    }, [defaultValues, form]);

    const handleSubmit = form.handleSubmit(async (values) => {
        if (webhookId) await updateWebhook.executeAsync(webhookId, values);
        else await createWebhook.executeAsync(values);

        mutate(WebhookApiService.getWebhooks.key());
        onSuccess?.();
    });

    return (
        <Form {...form}>
            <Context.Provider
                value={{
                    isEdit: !!webhookId,
                    hasSecret: !!webhookId,
                    hasToken: !!webhook?.hasToken,
                    handleSubmit,
                    isLoading:
                        updateWebhook.isLoading || createWebhook.isLoading,
                }}
            >
                {children}
            </Context.Provider>
        </Form>
    );
}

export function useWebhookFormContext() {
    const form = useFormContext<WebhookFormType>();

    const helpers = useContext(Context);

    if (!helpers) {
        throw new Error(
            "useWebhookFormContext must be used within a WebhookFormContextProvider"
        );
    }

    if (!form) {
        throw new Error(
            "useWebhookFormContext must be used within a WebhookFormContextProvider"
        );
    }

    return { form, ...helpers };
}