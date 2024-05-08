import { Anchor, Breadcrumbs } from '@mantine/core';
import styles from './MovieBreadcrumbs.module.css'

const MovieBreadcrumbs = ({items}) => {
    if (items && items.length) {
        return (
          <Breadcrumbs className={styles.MovieBreadcrumbs}>
            {items.map((item, index) => (
              <Anchor href={item.href} key={index}>
                {item.title}
              </Anchor>
            ))}
          </Breadcrumbs>
        )
    }

    return null;
};

export default MovieBreadcrumbs;