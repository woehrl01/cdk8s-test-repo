#! /bin/bash

# you have to install bun first, to execute the script with much higher performance
# Alternatively, you can use ts-node to run the script

# install bun from https://bun.sh/
#
# curl -fsSL https://bun.sh/install | bash

rm -rf dist/*

export CLUSTER_NAME="test"
export CLUSTER_ENVIRONMENT="dev"


CHART=RootApp \
    bun run ./main.ts

echo ""

CHART=ChartApp \
    bun run ./main.ts

echo ""

CHART=Chart2App \
    bun run ./main.ts
