FROM node AS site
RUN npm install -g pnpm
COPY /site .
RUN pnpm i && pnpm run build

FROM ghcr.io/obot-platform/obot:main
# Customize which docker image is used for the shell and the tools
ENV OBOT_SHELL_IMAGE=
ENV OBOT_SHELL_RUN_ARGS=
ENV OBOT_TOOL_IMAGE=
ENV OBOT_TOOL_RUN_ARGS=
ENV OBOT_DOCKER=true
ENV OBOT_SHELL_EXEC_ARGS=
ENV OBOT_ENV_KEYS=OBOT_SHELL_IMAGE,OBOT_TOOL_IMAGE,OBOT_SHELL_RUN_ARGS,OBOT_TOOL_RUN_ARGS,OBOT_SHELL_EXEC_ARGS,DOCKER_HOST,DOCKER_TLS_VERIFY,DOCKER_CONFIG
ENV OBOT_SERVER_STATIC_DIR=/static
COPY agents/ /agents/
COPY --from=site /build /static
