import styles from "./About.module.css";
import { Link } from 'react-router-dom';

const about = () => {
  return (
    <div className={styles.about}>
      <h2>Sobre o Study <span>Blog</span></h2>
      <p>Este projeto consiste em um blog feito em React no Front-end e Firebase no Back-end.
      </p>
      <Link to="/Posts/Create" className="btn">
        Criar Post
      </Link>
    </div>
  );
};

export default about;