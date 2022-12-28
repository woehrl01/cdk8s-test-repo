#! /bin/bash

# you have to install bun first, to execute the script with much higher performance
# Alternatively, you can use ts-node to run the script

# install bun from https://bun.sh/
#
# curl -fsSL https://bun.sh/install | bash

rm -rf dist/*

export CLUSTER_NAME="test-cluster"
export CLUSTER_ENVIRONMENT="dev"


#this command generates all the root app, in this current example this will generate the ArgoCD application for each chart
#CHART=RootApp \
#    bun run exec

echo ""

#this command generates the app for a specific chart, this should be called via the root app
CHART=ChartApp \
    bun run exec

echo ""

#this command generates the app for a specific chart, this should be called via the root app
#CHART=Chart2App \
#    bun run exec
