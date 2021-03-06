import * as React from 'react';
import * as classNames from 'classnames';
import { ResourceLink } from '@console/internal/components/utils';
import { K8sKind, referenceForModel } from '@console/internal/module/k8s';

import './DynamicResourceLinkList.scss';

export type ResourceModelLink = {
  model: K8sKind;
  name: string;
  displayName?: string;
};

type DynamicResourceLinkListProps = {
  links: ResourceModelLink[];
  namespace: string;
  title?: string;
  removeSpaceBelow?: boolean;
};

const DynamicResourceLinkList: React.FC<DynamicResourceLinkListProps> = ({
  links = [],
  namespace,
  title,
  removeSpaceBelow,
}) => {
  if (links.length === 0) {
    return null;
  }
  return (
    <div
      className={classNames('odc-dynamic-resource-link-list', {
        'odc-dynamic-resource-link-list--addSpaceBelow': !removeSpaceBelow,
      })}
    >
      <dl>
        {title && <dt>{title}</dt>}
        <dd>
          {links.map(({ name, model, displayName = '' }) => {
            const kind = referenceForModel(model);
            let linkName = name;
            if (displayName.length > 0 && name !== displayName) {
              linkName += ` (${displayName})`;
            }
            return (
              <div key={`${kind}/${name}`}>
                <ResourceLink
                  kind={kind}
                  name={name}
                  displayName={linkName}
                  namespace={namespace}
                  title={name}
                  inline
                />
              </div>
            );
          })}
        </dd>
      </dl>
    </div>
  );
};

export default DynamicResourceLinkList;
