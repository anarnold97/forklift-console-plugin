import type { FC } from 'react';
import { Link } from 'react-router-dom-v5-compat';
import { ExternalLink } from 'src/components/common/ExternalLink/ExternalLink';
import ForkliftEmptyState from 'src/components/empty-states/ForkliftEmptyState';
import automationIcon from 'src/components/empty-states/images/automation.svg';
import { getResourceUrl } from 'src/modules/Providers/utils/helpers/getResourceUrl';
import { useHasSufficientProviders } from 'src/utils/fetch';
import { ForkliftTrans, useForkliftTranslation } from 'src/utils/i18n';

import { ProviderModelRef } from '@kubev2v/types';
import { Button, Flex, FlexItem } from '@patternfly/react-core';

import NetworkMapsAddButton from './NetworkMapsAddButton';

const HELP_LINK_HREF =
  'https://docs.redhat.com/en/documentation/migration_toolkit_for_virtualization/';

const AutomationIcon = () => <img src={automationIcon} className="forklift-empty-state__icon" />;

const EmptyStatePlans: FC<{ namespace: string }> = ({ namespace }) => {
  const { t } = useForkliftTranslation();

  const hasSufficientProviders = useHasSufficientProviders(namespace);

  const ProvidersListURL = getResourceUrl({
    namespace,
    namespaced: namespace !== undefined,
    reference: ProviderModelRef,
  });

  return (
    <ForkliftEmptyState
      icon={AutomationIcon}
      title={
        namespace ? (
          <ForkliftTrans>
            No NetworkMaps found in namespace <strong>{namespace}</strong>.
          </ForkliftTrans>
        ) : (
          t('No NetworkMaps found.')
        )
      }
      textContent={
        !hasSufficientProviders ? (
          <Flex direction={{ default: 'column' }} alignItems={{ default: 'alignItemsCenter' }}>
            <FlexItem>
              <ForkliftTrans>
                Migration network maps are used to map network interfaces between source and target
                virtualization providers, at least one source and one target provider must be
                available in order to create a migration storage map,{' '}
                <ExternalLink href={HELP_LINK_HREF} isInline>
                  Learn more
                </ExternalLink>
                .
              </ForkliftTrans>
            </FlexItem>
            <FlexItem>
              <Button variant="secondary">
                <Link to={ProvidersListURL}>{t('Return to the providers list page')}</Link>
              </Button>
            </FlexItem>
          </Flex>
        ) : (
          t(
            'Migration networks maps are used to map network interfaces between source and target workloads.',
          )
        )
      }
      callForActionButtons={
        hasSufficientProviders && <NetworkMapsAddButton namespace={namespace} />
      }
    />
  );
};

export default EmptyStatePlans;
