import type { FC } from 'react';
import { useWatch } from 'react-hook-form';
import { PROVIDER_TYPES } from 'src/providers/utils/constants';

import ExpandableReviewSection from '@components/ExpandableReviewSection/ExpandableReviewSection';
import {
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
  useWizardContext,
} from '@patternfly/react-core';
import { isEmpty } from '@utils/helpers';
import { useForkliftTranslation } from '@utils/i18n';

import { planStepNames, PlanWizardStepId } from '../../constants';
import { useCreatePlanFormContext } from '../../hooks/useCreatePlanFormContext';
import { GeneralFormFieldId } from '../general-information/constants';
import { otherFormFieldLabels, OtherSettingsFormFieldId } from '../other-settings/constants';

const OtherSettingsReviewSection: FC = () => {
  const { t } = useForkliftTranslation();
  const { goToStepById } = useWizardContext();
  const { control } = useCreatePlanFormContext();
  const [
    sourceProvider,
    diskPassPhrases,
    transferNetwork,
    preserveStaticIps,
    rootDevice,
    sharedDisks,
  ] = useWatch({
    control,
    name: [
      GeneralFormFieldId.SourceProvider,
      OtherSettingsFormFieldId.DiskDecryptionPassPhrases,
      OtherSettingsFormFieldId.TransferNetwork,
      OtherSettingsFormFieldId.PreserveStaticIps,
      OtherSettingsFormFieldId.RootDevice,
      OtherSettingsFormFieldId.SharedDisks,
    ],
  });
  const isVsphere = sourceProvider?.spec?.type === PROVIDER_TYPES.vsphere;
  const hasNoDiskPassPhrases =
    isEmpty(diskPassPhrases) || (diskPassPhrases.length === 1 && !diskPassPhrases[0].value);

  return (
    <ExpandableReviewSection
      title={planStepNames[PlanWizardStepId.OtherSettings]}
      onEditClick={() => {
        goToStepById(PlanWizardStepId.OtherSettings);
      }}
    >
      <DescriptionList isHorizontal horizontalTermWidthModifier={{ default: '18ch' }}>
        {isVsphere && (
          <DescriptionListGroup>
            <DescriptionListTerm>
              {otherFormFieldLabels[OtherSettingsFormFieldId.DiskDecryptionPassPhrases]}
            </DescriptionListTerm>

            {hasNoDiskPassPhrases ? (
              <DescriptionListDescription>{t('None')}</DescriptionListDescription>
            ) : (
              diskPassPhrases.map((diskPassPhrase) => (
                <DescriptionListDescription key={diskPassPhrase.value}>
                  {diskPassPhrase.value}
                </DescriptionListDescription>
              ))
            )}
          </DescriptionListGroup>
        )}

        <DescriptionListGroup>
          <DescriptionListTerm>
            {otherFormFieldLabels[OtherSettingsFormFieldId.TransferNetwork]}
          </DescriptionListTerm>

          <DescriptionListDescription>
            {transferNetwork?.name ?? t('Target provider default')}
          </DescriptionListDescription>
        </DescriptionListGroup>

        {isVsphere && (
          <>
            <DescriptionListGroup>
              <DescriptionListTerm>
                {otherFormFieldLabels[OtherSettingsFormFieldId.PreserveStaticIps]}
              </DescriptionListTerm>

              <DescriptionListDescription>
                {preserveStaticIps ? t('Enabled') : t('Disabled')}
              </DescriptionListDescription>
            </DescriptionListGroup>

            <DescriptionListGroup>
              <DescriptionListTerm>
                {otherFormFieldLabels[OtherSettingsFormFieldId.RootDevice]}
              </DescriptionListTerm>

              <DescriptionListDescription>
                {rootDevice ?? t('First root device')}
              </DescriptionListDescription>
            </DescriptionListGroup>

            <DescriptionListGroup>
              <DescriptionListTerm>
                {otherFormFieldLabels[OtherSettingsFormFieldId.SharedDisks]}
              </DescriptionListTerm>

              <DescriptionListDescription>
                {sharedDisks ? t('Enabled') : t('Disabled')}
              </DescriptionListDescription>
            </DescriptionListGroup>
          </>
        )}
      </DescriptionList>
    </ExpandableReviewSection>
  );
};

export default OtherSettingsReviewSection;
