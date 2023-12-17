import { FC, useEffect, useRef } from 'react';

import trash from '../../assets/images/trash-bin.png';
import classes from './AssociationLine.module.scss';
import { Association } from '../../models/Association';

export interface AssociationLineProps {
  association: Association;
  isLast: boolean;
  onChangeName: (name: string) => void;
  onDeleteAssociation: () => void;
}

const AssociationLine: FC<AssociationLineProps> = ({ association, isLast, onChangeName, onDeleteAssociation }) => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isLast && ref.current) {
      ref.current.focus();
    }
  }, [isLast]);

  return (
    <li className={classes.container}>
      <div>
        <input
          tabIndex={0}
          ref={ref}
          className={classes.giver}
          type="text"
          value={association.giver}
          onChange={(e) => onChangeName(e.target.value)}
        />
      </div>
      <span>offre à</span>
      <div>
        <output tabIndex={-1} className={classes.receiver}>
          {association.receiver}
        </output>
      </div>
      <button tabIndex={1} className={classes.delete_button} onClick={onDeleteAssociation}>
        <img src={trash} alt="" />
      </button>
    </li>
  );
};

export default AssociationLine;
