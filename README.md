### ArgoCD CDK8s Test repo

Test repository for creating ArgoCD based clusters from code by using the power of cdk8s and some typescript.

Based on the idea of (https://github.com/dgzlopes/cdk8s-on-argocd)

Uses https://bun.sh/ for much more significant performance boost

Examples usage can be found in the kustomize-patches-argocd folder.

### Idea

- Generate one ArgoCD ApplicationSet with cluster generator (https://argocd-applicationset.readthedocs.io/en/stable/Generators-Cluster/)
- This one calls this repository with `CHART=RootApp` as env.
- Magic should happen. (or maybe not)

### Add Projects/Apps

- Add additional folders/modules similar to `ProjectA` and export the charts via the `index.ts`
- Register the module in `main.ts`.

### How does this work?

By registering additional modules, a root application is dynamically populated. The root application generates ArgoCD Applications for each app in the dedicated cluster. The cluster scope is passed into the modules, which allows you to fine tune the configuration of the app based of the cluster. It even allows you to finetune the branch if desired.

### Warning

Tests are not updated (yet) and thus fail.
