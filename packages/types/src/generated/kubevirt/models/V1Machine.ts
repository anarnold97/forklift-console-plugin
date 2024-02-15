/* tslint:disable */
/* eslint-disable */
/**
 * KubeVirt API
 * This is KubeVirt API an add-on for Kubernetes.
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: kubevirt-dev@googlegroups.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../../runtime';
/**
 * 
 * @export
 * @interface V1Machine
 */
export interface V1Machine {
    /**
     * QEMU machine type is the actual chipset of the VirtualMachineInstance.
     * @type {string}
     * @memberof V1Machine
     */
    type?: string;
}

/**
 * Check if a given object implements the V1Machine interface.
 */
export function instanceOfV1Machine(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function V1MachineFromJSON(json: any): V1Machine {
    return V1MachineFromJSONTyped(json, false);
}

export function V1MachineFromJSONTyped(json: any, ignoreDiscriminator: boolean): V1Machine {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'type': !exists(json, 'type') ? undefined : json['type'],
    };
}

export function V1MachineToJSON(value?: V1Machine | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'type': value.type,
    };
}
