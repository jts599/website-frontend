# Supplies the Node development image and a file mount point for the Novita key.
FROM mcr.microsoft.com/devcontainers/typescript-node:1-22-bookworm

# Docker requires a file target for a bind-mounted file; pre-creating it avoids
# accidentally treating ~/.novita-key as a directory during container creation.
RUN touch /home/node/.novita-key \
    && chown node:node /home/node/.novita-key
