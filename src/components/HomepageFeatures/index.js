import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'MOIL fisheye image',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
       MOIL fisheye image processing technology can be used to widen the angle and usage of 
image application in many ways. we continuously explore the 360 degree application
areas.
      </>
    ),
  },
  {
    title: 'Renesas MPUs',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        The Renesas RZ Family of 32-bit and 64-bit microprocessors (MPUs) enables the solutions required for the smart societies of the future. Through high-performance CPU cores and a variety of accelerators and peripheral functions, engineers can easily implement high-resolution human machine interfaces (HMI), embedded vision, embedded artificial intelligence (e-AI), and real-time control and industrial ethernet connectivity.
      </>
    ),
  },
  {
    title: 'Intergration',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        We supports your entire development process for embedded applications through development tools, as well as integrated development environments that greatly enhance your development environment. The integrated development environments support use of the Solution Toolkit extension plug-ins, which accelerate development and reduce total costs.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
