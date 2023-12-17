import { FC } from 'react';

import classes from './Associations.module.scss';
import AssociationLine from '../AssociationLine/AssociationLine';
import { AssociationType } from '../../models/Association';

export interface AssociationsProps {
  associations: AssociationType;
  onGiverNameChange: (id: string, name: string) => void;
  onDeleteAssociation: (id: string) => void;
}

const Associations: FC<AssociationsProps> = ({ associations, onGiverNameChange, onDeleteAssociation }) => {
  return (
    <ul className={[classes.container, Object.keys(associations).length > 0 ? '' : classes.empty].join(' ')}>
      {Object.entries(associations).map(([id, association], index) => (
        <AssociationLine
          key={id}
          association={association}
          isLast={index === Object.entries(associations).length - 1}
          onChangeName={onGiverNameChange.bind(this, id)}
          onDeleteAssociation={onDeleteAssociation.bind(this, id)}
        />
      ))}
    </ul>
  );
};

export default Associations;
