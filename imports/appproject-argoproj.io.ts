// generated by cdk8s
import { ApiObject, ApiObjectMetadata, GroupVersionKind } from 'cdk8s';
import { Construct } from 'constructs';


/**
 * AppProject provides a logical grouping of applications, providing controls for: * where the apps may deploy to (cluster whitelist) * what may be deployed (repository whitelist, resource whitelist/blacklist) * who can access these applications (roles, OIDC group claims bindings) * and what they can do (RBAC policies) * automation access to these roles (JWT tokens)
 *
 * @schema AppProject
 */
export class AppProject extends ApiObject {
  /**
   * Returns the apiVersion and kind for "AppProject"
   */
  public static readonly GVK: GroupVersionKind = {
    apiVersion: 'argoproj.io/v1alpha1',
    kind: 'AppProject',
  }

  /**
   * Renders a Kubernetes manifest for "AppProject".
   *
   * This can be used to inline resource manifests inside other objects (e.g. as templates).
   *
   * @param props initialization props
   */
  public static manifest(props: AppProjectProps): any {
    return {
      ...AppProject.GVK,
      ...toJson_AppProjectProps(props),
    };
  }

  /**
   * Defines a "AppProject" API object
   * @param scope the scope in which to define this object
   * @param id a scope-local name for the object
   * @param props initialization props
   */
  public constructor(scope: Construct, id: string, props: AppProjectProps) {
    super(scope, id, {
      ...AppProject.GVK,
      ...props,
    });
  }

  /**
   * Renders the object to Kubernetes JSON.
   */
  public toJson(): any {
    const resolved = super.toJson();

    return {
      ...AppProject.GVK,
      ...toJson_AppProjectProps(resolved),
    };
  }
}

/**
 * AppProject provides a logical grouping of applications, providing controls for: * where the apps may deploy to (cluster whitelist) * what may be deployed (repository whitelist, resource whitelist/blacklist) * who can access these applications (roles, OIDC group claims bindings) * and what they can do (RBAC policies) * automation access to these roles (JWT tokens)
 *
 * @schema AppProject
 */
export interface AppProjectProps {
  /**
   * @schema AppProject#metadata
   */
  readonly metadata: ApiObjectMetadata;

  /**
   * AppProjectSpec is the specification of an AppProject
   *
   * @schema AppProject#spec
   */
  readonly spec: AppProjectSpec;

}

/**
 * Converts an object of type 'AppProjectProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_AppProjectProps(obj: AppProjectProps | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'metadata': obj.metadata,
    'spec': toJson_AppProjectSpec(obj.spec),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * AppProjectSpec is the specification of an AppProject
 *
 * @schema AppProjectSpec
 */
export interface AppProjectSpec {
  /**
   * ClusterResourceBlacklist contains list of blacklisted cluster level resources
   *
   * @schema AppProjectSpec#clusterResourceBlacklist
   */
  readonly clusterResourceBlacklist?: AppProjectSpecClusterResourceBlacklist[];

  /**
   * ClusterResourceWhitelist contains list of whitelisted cluster level resources
   *
   * @schema AppProjectSpec#clusterResourceWhitelist
   */
  readonly clusterResourceWhitelist?: AppProjectSpecClusterResourceWhitelist[];

  /**
   * Description contains optional project description
   *
   * @schema AppProjectSpec#description
   */
  readonly description?: string;

  /**
   * Destinations contains list of destinations available for deployment
   *
   * @schema AppProjectSpec#destinations
   */
  readonly destinations?: AppProjectSpecDestinations[];

  /**
   * NamespaceResourceBlacklist contains list of blacklisted namespace level resources
   *
   * @schema AppProjectSpec#namespaceResourceBlacklist
   */
  readonly namespaceResourceBlacklist?: AppProjectSpecNamespaceResourceBlacklist[];

  /**
   * NamespaceResourceWhitelist contains list of whitelisted namespace level resources
   *
   * @schema AppProjectSpec#namespaceResourceWhitelist
   */
  readonly namespaceResourceWhitelist?: AppProjectSpecNamespaceResourceWhitelist[];

  /**
   * OrphanedResources specifies if controller should monitor orphaned resources of apps in this project
   *
   * @schema AppProjectSpec#orphanedResources
   */
  readonly orphanedResources?: AppProjectSpecOrphanedResources;

  /**
   * PermitOnlyProjectScopedClusters determines whether destinations can only reference clusters which are project-scoped
   *
   * @schema AppProjectSpec#permitOnlyProjectScopedClusters
   */
  readonly permitOnlyProjectScopedClusters?: boolean;

  /**
   * Roles are user defined RBAC roles associated with this project
   *
   * @schema AppProjectSpec#roles
   */
  readonly roles?: AppProjectSpecRoles[];

  /**
   * SignatureKeys contains a list of PGP key IDs that commits in Git must be signed with in order to be allowed for sync
   *
   * @schema AppProjectSpec#signatureKeys
   */
  readonly signatureKeys?: AppProjectSpecSignatureKeys[];

  /**
   * SourceNamespaces defines the namespaces application resources are allowed to be created in
   *
   * @schema AppProjectSpec#sourceNamespaces
   */
  readonly sourceNamespaces?: string[];

  /**
   * SourceRepos contains list of repository URLs which can be used for deployment
   *
   * @schema AppProjectSpec#sourceRepos
   */
  readonly sourceRepos?: string[];

  /**
   * SyncWindows controls when syncs can be run for apps in this project
   *
   * @schema AppProjectSpec#syncWindows
   */
  readonly syncWindows?: AppProjectSpecSyncWindows[];

}

/**
 * Converts an object of type 'AppProjectSpec' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_AppProjectSpec(obj: AppProjectSpec | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'clusterResourceBlacklist': obj.clusterResourceBlacklist?.map(y => toJson_AppProjectSpecClusterResourceBlacklist(y)),
    'clusterResourceWhitelist': obj.clusterResourceWhitelist?.map(y => toJson_AppProjectSpecClusterResourceWhitelist(y)),
    'description': obj.description,
    'destinations': obj.destinations?.map(y => toJson_AppProjectSpecDestinations(y)),
    'namespaceResourceBlacklist': obj.namespaceResourceBlacklist?.map(y => toJson_AppProjectSpecNamespaceResourceBlacklist(y)),
    'namespaceResourceWhitelist': obj.namespaceResourceWhitelist?.map(y => toJson_AppProjectSpecNamespaceResourceWhitelist(y)),
    'orphanedResources': toJson_AppProjectSpecOrphanedResources(obj.orphanedResources),
    'permitOnlyProjectScopedClusters': obj.permitOnlyProjectScopedClusters,
    'roles': obj.roles?.map(y => toJson_AppProjectSpecRoles(y)),
    'signatureKeys': obj.signatureKeys?.map(y => toJson_AppProjectSpecSignatureKeys(y)),
    'sourceNamespaces': obj.sourceNamespaces?.map(y => y),
    'sourceRepos': obj.sourceRepos?.map(y => y),
    'syncWindows': obj.syncWindows?.map(y => toJson_AppProjectSpecSyncWindows(y)),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * GroupKind specifies a Group and a Kind, but does not force a version.  This is useful for identifying concepts during lookup stages without having partially valid types
 *
 * @schema AppProjectSpecClusterResourceBlacklist
 */
export interface AppProjectSpecClusterResourceBlacklist {
  /**
   * @schema AppProjectSpecClusterResourceBlacklist#group
   */
  readonly group: string;

  /**
   * @schema AppProjectSpecClusterResourceBlacklist#kind
   */
  readonly kind: string;

}

/**
 * Converts an object of type 'AppProjectSpecClusterResourceBlacklist' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_AppProjectSpecClusterResourceBlacklist(obj: AppProjectSpecClusterResourceBlacklist | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'group': obj.group,
    'kind': obj.kind,
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * GroupKind specifies a Group and a Kind, but does not force a version.  This is useful for identifying concepts during lookup stages without having partially valid types
 *
 * @schema AppProjectSpecClusterResourceWhitelist
 */
export interface AppProjectSpecClusterResourceWhitelist {
  /**
   * @schema AppProjectSpecClusterResourceWhitelist#group
   */
  readonly group: string;

  /**
   * @schema AppProjectSpecClusterResourceWhitelist#kind
   */
  readonly kind: string;

}

/**
 * Converts an object of type 'AppProjectSpecClusterResourceWhitelist' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_AppProjectSpecClusterResourceWhitelist(obj: AppProjectSpecClusterResourceWhitelist | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'group': obj.group,
    'kind': obj.kind,
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * ApplicationDestination holds information about the application's destination
 *
 * @schema AppProjectSpecDestinations
 */
export interface AppProjectSpecDestinations {
  /**
   * Name is an alternate way of specifying the target cluster by its symbolic name
   *
   * @schema AppProjectSpecDestinations#name
   */
  readonly name?: string;

  /**
   * Namespace specifies the target namespace for the application's resources. The namespace will only be set for namespace-scoped resources that have not set a value for .metadata.namespace
   *
   * @schema AppProjectSpecDestinations#namespace
   */
  readonly namespace?: string;

  /**
   * Server specifies the URL of the target cluster and must be set to the Kubernetes control plane API
   *
   * @schema AppProjectSpecDestinations#server
   */
  readonly server?: string;

}

/**
 * Converts an object of type 'AppProjectSpecDestinations' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_AppProjectSpecDestinations(obj: AppProjectSpecDestinations | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'name': obj.name,
    'namespace': obj.namespace,
    'server': obj.server,
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * GroupKind specifies a Group and a Kind, but does not force a version.  This is useful for identifying concepts during lookup stages without having partially valid types
 *
 * @schema AppProjectSpecNamespaceResourceBlacklist
 */
export interface AppProjectSpecNamespaceResourceBlacklist {
  /**
   * @schema AppProjectSpecNamespaceResourceBlacklist#group
   */
  readonly group: string;

  /**
   * @schema AppProjectSpecNamespaceResourceBlacklist#kind
   */
  readonly kind: string;

}

/**
 * Converts an object of type 'AppProjectSpecNamespaceResourceBlacklist' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_AppProjectSpecNamespaceResourceBlacklist(obj: AppProjectSpecNamespaceResourceBlacklist | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'group': obj.group,
    'kind': obj.kind,
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * GroupKind specifies a Group and a Kind, but does not force a version.  This is useful for identifying concepts during lookup stages without having partially valid types
 *
 * @schema AppProjectSpecNamespaceResourceWhitelist
 */
export interface AppProjectSpecNamespaceResourceWhitelist {
  /**
   * @schema AppProjectSpecNamespaceResourceWhitelist#group
   */
  readonly group: string;

  /**
   * @schema AppProjectSpecNamespaceResourceWhitelist#kind
   */
  readonly kind: string;

}

/**
 * Converts an object of type 'AppProjectSpecNamespaceResourceWhitelist' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_AppProjectSpecNamespaceResourceWhitelist(obj: AppProjectSpecNamespaceResourceWhitelist | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'group': obj.group,
    'kind': obj.kind,
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * OrphanedResources specifies if controller should monitor orphaned resources of apps in this project
 *
 * @schema AppProjectSpecOrphanedResources
 */
export interface AppProjectSpecOrphanedResources {
  /**
   * Ignore contains a list of resources that are to be excluded from orphaned resources monitoring
   *
   * @schema AppProjectSpecOrphanedResources#ignore
   */
  readonly ignore?: AppProjectSpecOrphanedResourcesIgnore[];

  /**
   * Warn indicates if warning condition should be created for apps which have orphaned resources
   *
   * @schema AppProjectSpecOrphanedResources#warn
   */
  readonly warn?: boolean;

}

/**
 * Converts an object of type 'AppProjectSpecOrphanedResources' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_AppProjectSpecOrphanedResources(obj: AppProjectSpecOrphanedResources | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'ignore': obj.ignore?.map(y => toJson_AppProjectSpecOrphanedResourcesIgnore(y)),
    'warn': obj.warn,
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * ProjectRole represents a role that has access to a project
 *
 * @schema AppProjectSpecRoles
 */
export interface AppProjectSpecRoles {
  /**
   * Description is a description of the role
   *
   * @schema AppProjectSpecRoles#description
   */
  readonly description?: string;

  /**
   * Groups are a list of OIDC group claims bound to this role
   *
   * @schema AppProjectSpecRoles#groups
   */
  readonly groups?: string[];

  /**
   * JWTTokens are a list of generated JWT tokens bound to this role
   *
   * @schema AppProjectSpecRoles#jwtTokens
   */
  readonly jwtTokens?: AppProjectSpecRolesJwtTokens[];

  /**
   * Name is a name for this role
   *
   * @schema AppProjectSpecRoles#name
   */
  readonly name: string;

  /**
   * Policies Stores a list of casbin formatted strings that define access policies for the role in the project
   *
   * @schema AppProjectSpecRoles#policies
   */
  readonly policies?: string[];

}

/**
 * Converts an object of type 'AppProjectSpecRoles' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_AppProjectSpecRoles(obj: AppProjectSpecRoles | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'description': obj.description,
    'groups': obj.groups?.map(y => y),
    'jwtTokens': obj.jwtTokens?.map(y => toJson_AppProjectSpecRolesJwtTokens(y)),
    'name': obj.name,
    'policies': obj.policies?.map(y => y),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * SignatureKey is the specification of a key required to verify commit signatures with
 *
 * @schema AppProjectSpecSignatureKeys
 */
export interface AppProjectSpecSignatureKeys {
  /**
   * The ID of the key in hexadecimal notation
   *
   * @schema AppProjectSpecSignatureKeys#keyID
   */
  readonly keyId: string;

}

/**
 * Converts an object of type 'AppProjectSpecSignatureKeys' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_AppProjectSpecSignatureKeys(obj: AppProjectSpecSignatureKeys | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'keyID': obj.keyId,
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * SyncWindow contains the kind, time, duration and attributes that are used to assign the syncWindows to apps
 *
 * @schema AppProjectSpecSyncWindows
 */
export interface AppProjectSpecSyncWindows {
  /**
   * Applications contains a list of applications that the window will apply to
   *
   * @schema AppProjectSpecSyncWindows#applications
   */
  readonly applications?: string[];

  /**
   * Clusters contains a list of clusters that the window will apply to
   *
   * @schema AppProjectSpecSyncWindows#clusters
   */
  readonly clusters?: string[];

  /**
   * Duration is the amount of time the sync window will be open
   *
   * @schema AppProjectSpecSyncWindows#duration
   */
  readonly duration?: string;

  /**
   * Kind defines if the window allows or blocks syncs
   *
   * @schema AppProjectSpecSyncWindows#kind
   */
  readonly kind?: string;

  /**
   * ManualSync enables manual syncs when they would otherwise be blocked
   *
   * @schema AppProjectSpecSyncWindows#manualSync
   */
  readonly manualSync?: boolean;

  /**
   * Namespaces contains a list of namespaces that the window will apply to
   *
   * @schema AppProjectSpecSyncWindows#namespaces
   */
  readonly namespaces?: string[];

  /**
   * Schedule is the time the window will begin, specified in cron format
   *
   * @schema AppProjectSpecSyncWindows#schedule
   */
  readonly schedule?: string;

  /**
   * TimeZone of the sync that will be applied to the schedule
   *
   * @schema AppProjectSpecSyncWindows#timeZone
   */
  readonly timeZone?: string;

}

/**
 * Converts an object of type 'AppProjectSpecSyncWindows' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_AppProjectSpecSyncWindows(obj: AppProjectSpecSyncWindows | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'applications': obj.applications?.map(y => y),
    'clusters': obj.clusters?.map(y => y),
    'duration': obj.duration,
    'kind': obj.kind,
    'manualSync': obj.manualSync,
    'namespaces': obj.namespaces?.map(y => y),
    'schedule': obj.schedule,
    'timeZone': obj.timeZone,
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * OrphanedResourceKey is a reference to a resource to be ignored from
 *
 * @schema AppProjectSpecOrphanedResourcesIgnore
 */
export interface AppProjectSpecOrphanedResourcesIgnore {
  /**
   * @schema AppProjectSpecOrphanedResourcesIgnore#group
   */
  readonly group?: string;

  /**
   * @schema AppProjectSpecOrphanedResourcesIgnore#kind
   */
  readonly kind?: string;

  /**
   * @schema AppProjectSpecOrphanedResourcesIgnore#name
   */
  readonly name?: string;

}

/**
 * Converts an object of type 'AppProjectSpecOrphanedResourcesIgnore' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_AppProjectSpecOrphanedResourcesIgnore(obj: AppProjectSpecOrphanedResourcesIgnore | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'group': obj.group,
    'kind': obj.kind,
    'name': obj.name,
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * JWTToken holds the issuedAt and expiresAt values of a token
 *
 * @schema AppProjectSpecRolesJwtTokens
 */
export interface AppProjectSpecRolesJwtTokens {
  /**
   * @schema AppProjectSpecRolesJwtTokens#exp
   */
  readonly exp?: number;

  /**
   * @schema AppProjectSpecRolesJwtTokens#iat
   */
  readonly iat: number;

  /**
   * @schema AppProjectSpecRolesJwtTokens#id
   */
  readonly id?: string;

}

/**
 * Converts an object of type 'AppProjectSpecRolesJwtTokens' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_AppProjectSpecRolesJwtTokens(obj: AppProjectSpecRolesJwtTokens | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'exp': obj.exp,
    'iat': obj.iat,
    'id': obj.id,
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */
