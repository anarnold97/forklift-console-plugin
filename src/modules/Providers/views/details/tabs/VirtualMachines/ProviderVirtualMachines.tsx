import type { FC } from 'react';
import type { ProviderData } from 'src/modules/Providers/utils/types/ProviderData';
import { ForkliftTrans, useForkliftTranslation } from 'src/utils/i18n';

import { ProviderModelGroupVersionKind, type V1beta1Provider } from '@kubev2v/types';
import { useK8sWatchResource } from '@openshift-console/dynamic-plugin-sdk';
import { Alert, PageSection } from '@patternfly/react-core';
import BellIcon from '@patternfly/react-icons/dist/esm/icons/bell-icon';

import type { VmData } from './components/VMCellProps';
import { useInventoryVms } from './utils/hooks/useInventoryVms';
import { OpenShiftVirtualMachinesList } from './OpenShiftVirtualMachinesList';
import { OpenStackVirtualMachinesList } from './OpenStackVirtualMachinesList';
import { OvaVirtualMachinesList } from './OvaVirtualMachinesList';
import { OVirtVirtualMachinesList } from './OVirtVirtualMachinesList';
import { VSphereVirtualMachinesList } from './VSphereVirtualMachinesList';

export type ProviderVirtualMachinesProps = {
  title?: string;
  obj: ProviderData;
  loaded?: boolean;
  loadError?: unknown;
  onSelect?: (selectedVMs: VmData[]) => void;
  initialSelectedIds?: string[];
  showActions: boolean;
  className?: string;
  selectedCountLabel?: (selectedIdCount: number) => string;
};

export const ProviderVirtualMachines: FC<{ name: string; namespace: string }> = ({
  name,
  namespace,
}) => {
  const { t } = useForkliftTranslation();

  const [provider, providerLoaded, providerLoadError] = useK8sWatchResource<V1beta1Provider>({
    groupVersionKind: ProviderModelGroupVersionKind,
    name,
    namespace,
    namespaced: true,
  });

  const [vmData, vmDataLoading] = useInventoryVms({ provider }, providerLoaded, providerLoadError);
  const obj = { provider, vmData, vmDataLoading };

  return (
    <>
      <PageSection variant="light" className="forklift-page-section--info">
        {vmData?.length > 0 && (
          <Alert
            customIcon={<BellIcon />}
            variant="info"
            title={t('How to create a migration plan')}
          >
            <ForkliftTrans>
              To migrate virtual machines from <strong>{name}</strong> provider, select the virtual
              machines to migrate from the list of available virtual machines and click the{' '}
              <strong>Create migration plan</strong> button.
            </ForkliftTrans>
          </Alert>
        )}
      </PageSection>

      <ProviderVirtualMachinesListWrapper
        obj={obj}
        loaded={providerLoaded}
        loadError={providerLoadError}
        showActions={true}
      />
    </>
  );
};

export const ProviderVirtualMachinesListWrapper: FC<ProviderVirtualMachinesProps> = (props) => {
  switch (props.obj?.provider?.spec?.type) {
    case 'openshift':
      return <OpenShiftVirtualMachinesList {...props} />;
    case 'openstack':
      return <OpenStackVirtualMachinesList {...props} />;
    case 'ovirt':
      return <OVirtVirtualMachinesList {...props} />;
    case 'vsphere':
      return <VSphereVirtualMachinesList {...props} />;
    case 'ova':
      return <OvaVirtualMachinesList {...props} />;
    default:
      // unsupported provider or loading errors will be handled by parent page
      return <></>;
  }
};
