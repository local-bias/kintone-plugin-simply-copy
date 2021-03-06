import React, { Suspense, VFC } from 'react';
import { SnackbarProvider } from 'notistack';

import { Footer, Form } from './components';
import { RecoilRoot } from 'recoil';
import { pluginIdState, storageState } from './states';
import { restoreStorage } from '@common/plugin';
import { Loading } from '@common/components/loading';
import SocialIcons from './components/social-icons';

const Component: VFC<{ pluginId: string }> = ({ pluginId }) => (
  <>
    <RecoilRoot
      initializeState={({ set }) => {
        set(pluginIdState, pluginId);
        set(storageState, restoreStorage(pluginId));
      }}
    >
      <SnackbarProvider maxSnack={3}>
        <Suspense fallback={<Loading label='設定情報を取得しています' />}>
          <Form />
          <Footer />
        </Suspense>
      </SnackbarProvider>
    </RecoilRoot>
    <SocialIcons />
  </>
);

export default Component;
