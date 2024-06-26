import { Anchor, Breadcrumbs } from '@mantine/core';
import styles from './MovieBreadcrumbs.module.css'
import { useMediaQuery } from '@mantine/hooks';

interface MovieBreadCrumb {
  title?: string,
  href?: string
}

interface MovieBreadcrumbsProps {
  items: MovieBreadCrumb[]
}

const MovieBreadcrumbs = ({items}: MovieBreadcrumbsProps) => {
    const isSmallScreen = useMediaQuery('(max-width: 1090px)');

    if (items && items.length) {
        return (
            <Breadcrumbs className={styles.MovieBreadcrumbs}>
                {items.map((item, index) => (
                    <Anchor href={item.href} key={index} size={isSmallScreen ? 'xs' : 'md'}>
                        {item.title}
                    </Anchor>
                ))}
            </Breadcrumbs>
        )
    }

    return null;
};

export default MovieBreadcrumbs;