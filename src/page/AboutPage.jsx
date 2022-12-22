import Card from '../components/shared/Card';
import {Link} from 'react-router-dom';

function AboutPage() {
  return (
    <Card>
        <div>
            <h1>A Propos de cette page</h1>
            <p>Ceci est une application React pour laisser un avis sur un produit ou un service.</p>
            <p>Version: 1.0.0</p>
            <Link to='/'>Retour sur la page d'accueil</Link>
        </div>
    </Card>
  )
}

export default AboutPage