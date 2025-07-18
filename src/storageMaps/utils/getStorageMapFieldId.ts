import { StorageMapFieldId, type StorageMapping } from '../constants';

type StorageMappingId = `${StorageMapFieldId.StorageMap}.${number}.${keyof StorageMapping}`;

/**
 * Creates a field ID for a storage mapping at a specific index
 * Used for form field identification and validation
 */
export const getStorageMapFieldId = (id: keyof StorageMapping, index: number): StorageMappingId =>
  `${StorageMapFieldId.StorageMap}.${index}.${id}`;
