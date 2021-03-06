import React, { FC, Suspense, VFCX } from 'react';
import { useRecoilValue } from 'recoil';
import styled from '@emotion/styled';
import { CircularProgress } from '@material-ui/core';

import { storageState } from '../../states';
import ConditionAdditionButton from './condition-addition-button';
import Condition from './condition';

type Props = Readonly<{
  storage: kintone.plugin.Storage | null;
}>;

const Component: VFCX<Props> = ({ className, storage }) => (
  <div {...{ className }}>
    {!storage && (
      <>
        <CircularProgress />
        <div>設定情報を取得しています</div>
      </>
    )}
    {!!storage && (
      <>
        <Suspense fallback={<div>アプリ情報を取得しています</div>}>
          {storage.conditions.map((condition, index) => (
            <Condition key={index} {...{ condition, index }} />
          ))}
        </Suspense>
        <ConditionAdditionButton label='新しい設定' />
      </>
    )}
  </div>
);

const StyledComponent = styled(Component)`
  width: 100%;

  & > div {
    padding: 1em;
  }
`;

const Container: FC = () => {
  const storage = useRecoilValue(storageState);

  return <StyledComponent {...{ storage }} />;
};

export default Container;
