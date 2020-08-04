import React from 'react';
import {
  Flex,
  Box,
  BlockstackIcon,
  Stack,
  color,
  space,
  BoxProps,
  ChevronIcon,
  FlexProps,
  Fade,
} from '@blockstack/ui';
import { Link, LinkProps, Text } from '@components/typography';
import MenuIcon from 'mdi-react/MenuIcon';
import CloseIcon from 'mdi-react/CloseIcon';
import { useMobileMenuState } from '@common/hooks/use-mobile-menu';

import { css } from '@styled-system/css';
import NextLink from 'next/link';
import { ColorModeButton } from '@components/color-mode-button';
import { PAGE_WIDTH } from '@common/constants';
import { border, transition } from '@common/utils';
import { getCapsizeStyles } from '@components/mdx/typography';
import { useTouchable } from '@common/hooks/use-touchable';
import { useRouter } from 'next/router';

const MenuButton = ({ ...rest }: any) => {
  const { isOpen, handleOpen, handleClose } = useMobileMenuState();
  const Icon = isOpen ? CloseIcon : MenuIcon;
  const handleClick = isOpen ? handleClose : handleOpen;
  return (
    <Flex
      color="var(--colors-invert)"
      display={['flex', 'flex', 'none']}
      onClick={handleClick}
      px={1}
    >
      <Icon color="currentColor" />
    </Flex>
  );
};

const HeaderWrapper: React.FC<any> = React.forwardRef((props, ref) => (
  <Box as="header" ref={ref} width="100%" position="relative" zIndex={9999} {...props} />
));

const nav = [
  {
    label: 'Start building',
    children: [
      {
        label: 'Documentation',
        href: 'https://docs.blockstack.org/',
      },
      {
        label: 'GitHub',
        href: 'https://github.com/blockstack',
      },
      {
        label: 'Papers',
        href: 'https://www.blockstack.org/papers',
      },
      {
        label: 'Discord',
        href: 'https://discord.com/invite/6PcCMU',
      },
    ],
  },
  { label: 'Testnet', href: 'https://www.blockstack.org/testnet' },
  { label: 'Discover apps', href: 'https://app.co/' },
];

export const HEADER_HEIGHT = 132;

const HeaderTextItem: React.FC<BoxProps & LinkProps> = ({ children, href, as, ...rest }) => (
  <Text
    color={color('invert')}
    css={css({
      ...getCapsizeStyles(16, 26),
      ...rest,
      color: 'currentColor',
      ':hover': {
        cursor: 'pointer',
        textDecoration: href ? 'underline' : 'none',
        color: href ? color('accent') : 'currentColor',
      },
    })}
    as={as}
    // @ts-ignore
    href={href}
  >
    {children}
  </Text>
);

const NavItem: React.FC<FlexProps & { item: any }> = ({ item, ...props }) => {
  const { hover, active, bind } = useTouchable({
    behavior: 'link',
  });
  return (
    <Flex justifyContent="center" position="relative" {...props} {...bind}>
      <HeaderTextItem as={item.href ? 'a' : 'span'} href={item.href}>
        {item.label}
      </HeaderTextItem>

      {item.children ? (
        <Box color={color('text-caption')} ml={space('extra-tight')}>
          <ChevronIcon direction="down" />
        </Box>
      ) : null}
      {item.children ? (
        <Fade in={hover || active}>
          {styles => (
            <Box
              pt={space('base-loose')}
              top="100%"
              position="absolute"
              transform="translateX(-5px)"
              zIndex={99999999}
              minWidth="200px"
              style={{ ...styles }}
            >
              <Box
                borderRadius="12px"
                border={border()}
                bg={color('bg')}
                overflow="hidden"
                boxShadow="0 0 8px 0 rgba(15,17,23,.03), 0 16px 40px 0 rgba(15,17,23,.06)"
              >
                {item.children.map((child, _key) => (
                  <Box
                    _hover={{
                      bg: color('accent'),
                      color: color('bg'),
                      cursor: 'pointer',
                    }}
                    transition={transition()}
                    color={color('text-title')}
                    borderBottom={_key < item.children.length - 1 && border()}
                    px={space('base')}
                    py={space('base-loose')}
                    as="a"
                    display="block"
                    // @ts-ignore
                    href={child.href}
                    target="_blank"
                  >
                    <HeaderTextItem color="currentColor">{child.label}</HeaderTextItem>
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </Fade>
      ) : null}
    </Flex>
  );
};

const Navigation: React.FC<BoxProps> = props => {
  return (
    <Box
      as="nav"
      position="relative"
      zIndex={99999999}
      display={['none', 'none', 'block']}
      transform="translateY(2px)"
      {...props}
    >
      <Stack mr={space('base')} isInline spacing={space('extra-loose')}>
        {nav.map((item, key) => (
          <NavItem item={item} key={key} />
        ))}
      </Stack>
    </Box>
  );
};

const LogoLink = () => {
  const { hover, active, bind } = useTouchable();
  const router = useRouter();
  return (
    <NextLink href="/" passHref>
      <Link
        as="a"
        style={{
          textDecoration: 'none',
          pointerEvents: router.pathname === '/' ? 'none' : 'unset',
        }}
        {...bind}
      >
        <Flex as="span" align="center">
          <Box
            as="span"
            // opacity={hover || active ? 0.75 : 1}
            color={hover || active ? color('accent') : color('invert')}
            mr={space('tight')}
          >
            <BlockstackIcon size="20px" />
          </Box>
          <Box as="span" transform="translateY(1px)">
            <HeaderTextItem>Blockstack</HeaderTextItem>
          </Box>
        </Flex>
      </Link>
    </NextLink>
  );
};

const Header = ({ hideSubBar, ...rest }: any) => {
  return (
    <>
      <HeaderWrapper>
        <Box mx="auto" px="extra-loose">
          <Flex
            justifyContent="space-between"
            align="center"
            bg={color('bg')}
            style={{
              backdropFilter: 'blur(5px)',
            }}
            height="72px"
            maxWidth={`${PAGE_WIDTH}px`}
            mx="auto"
            color={color('text-title')}
            {...rest}
          >
            <LogoLink />
            <Flex align="center">
              <Navigation />
              <ColorModeButton />
              <MenuButton />
            </Flex>
          </Flex>
        </Box>
      </HeaderWrapper>
    </>
  );
};

export { Header };
