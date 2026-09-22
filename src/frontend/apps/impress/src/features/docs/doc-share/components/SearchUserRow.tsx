import { css } from 'styled-components';

import { Box, Text } from '@/components';
import {
  QuickSearchItemContent,
  QuickSearchItemContentProps,
} from '@/components/quick-search';
import { useCunninghamTheme } from '@/cunningham';
import { User, UserAvatar } from '@/features/auth';

type Props = {
  user: User;
  alwaysShowRight?: boolean;
  right?: QuickSearchItemContentProps['right'];
  isInvitation?: boolean;
  /** Show the @handle line (hidden for invitations, which have no handle yet). */
  showHandle?: boolean;
  /** Show the email on a third line — only for users allowed to manage accesses. */
  showEmail?: boolean;
};

export const SearchUserRow = ({
  user,
  right,
  alwaysShowRight = false,
  isInvitation = false,
  showHandle = true,
  showEmail = false,
}: Props) => {
  const { spacingsTokens, colorsTokens } = useCunninghamTheme();
  const { full_name, short_name, email } = user;
  // Invitations are emails by definition (no account yet): short_name == email.
  const hasHandle = showHandle && !!short_name && short_name !== email;
  const displayHandle = hasHandle ? `@${short_name}` : '';
  const displayMain = full_name || displayHandle || email;

  return (
    <QuickSearchItemContent
      right={right}
      alwaysShowRight={alwaysShowRight}
      left={
        <Box
          $direction="row"
          $align="center"
          $gap={spacingsTokens['xs']}
          className="--docs--search-user-row"
        >
          <UserAvatar
            fullName={full_name || email}
            background={isInvitation ? colorsTokens['gray-400'] : undefined}
          />
          <Box $direction="column">
            <Text
              $size="sm"
              $weight="500"
              $css={css`
                line-break: anywhere;
              `}
            >
              {displayMain}
            </Text>
            {hasHandle && (
              <Text
                $size="xs"
                $margin={{ top: '-2px' }}
                $variation="secondary"
                $css={css`
                  line-break: anywhere;
                `}
              >
                {displayHandle}
              </Text>
            )}
            {showEmail && email && (
              <Text
                $size="xs"
                $margin={{ top: '-2px' }}
                $variation="secondary"
                $css={css`
                  line-break: anywhere;
                `}
              >
                {email}
              </Text>
            )}
          </Box>
        </Box>
      }
    />
  );
};