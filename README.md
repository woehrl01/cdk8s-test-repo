### ArgoCD CDK8s Test repo

Test repository for creating ArgoCD based containers from code 

Should be able to use in combination with (https://github.com/dgzlopes/cdk8s-on-argocd) (not tested yet)

Uses https://bun.sh/ for much more significant performance boost

### Idea:
- Generate one ArgoCD ApplicationSet with cluster generator (https://argocd-applicationset.readthedocs.io/en/stable/Generators-Cluster/)
- This one calls this repository with `CHART=RootApp` as env. 
- Magic should happen. (or maybe not)

### Add Projects/Apps
- Add additional folders/modules similar to `ProjectA` and export the charts via the `index.ts`
- Register the module in `main.ts`.
