import type { CSSProperties } from 'react';
import { UserMenu } from '@gouvfr-lasuite/ui-components';
import { useTranslation } from 'react-i18next';
import { createGlobalStyle } from 'styled-components';

import { Box } from '@/components';
import { Waffle } from '@/components/Waffle';
import { ButtonLogin, gotoLogout, useAuth } from '@/features/auth';
import { HelpMenu } from '@/features/help';
import { LanguagePicker } from '@/features/language/components/LanguagePicker';

const FooterActionsGlobalStyle = createGlobalStyle`
  .user-menu__actions .c__language-picker{
    width: auto;
  }
  /* Replace the initials avatar with the AIP OIDC picture when available. */
  .--docs--footer-actions[data-byoc-avatar] .c__avatar .c__avatar__initials {
    color: transparent;
  }
  .--docs--footer-actions[data-byoc-avatar] .c__avatar {
    background-image: var(--byoc-avatar-url);
    background-size: cover;
    background-position: center;
  }
`;

export const FooterActions = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  const userMenu = user || {
    full_name: t('Guest'),
    email: '',
  };

  return (
    <>
      <FooterActionsGlobalStyle />
      <Box
        $padding={{ horizontal: 'sm' }}
        $direction="row"
        $align="center"
        $gap="3xs"
        $justify="space-between"
        className="--docs--footer-actions"
        data-byoc-avatar={user?.avatar || undefined}
        style={
          user?.avatar
            ? ({ '--byoc-avatar-url': user.avatar } as CSSProperties)
            : undefined
        }
      >
        <Box $direction="row" $align="center" $gap="3xs">
          <UserMenu
            user={userMenu}
            logout={user ? gotoLogout : undefined}
            actions={<LanguagePicker />}
            withMobileView={false}
          />
          <Waffle />
          <ButtonLogin />
        </Box>
        <HelpMenu />
      </Box>
    </>
  );
};
