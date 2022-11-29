import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Error from './componentes/Error';
import LoginRegistro from './componentes/LoginRegistro';
import CrearPirata from './componentes/CrearPirata';
import MostrarPiratas from './componentes/MostrarPiratas';
import MostrarPirata from './componentes/MostrarPirata';
import './App.css';

const App = () => {
  return(
    <div className="container">
      <BrowserRouter>
        <Switch>
          <Route path="/login" render={()=> <LoginRegistro/> } />
          <Route path="/" exact render={()=><MostrarPiratas />} />
          <Route path="/crear_pirata" render={() => <CrearPirata />} />
          <Route path="/pirata/:id" render={() => <MostrarPirata />}/>
          <Route path="/error" render={() => <Error /> } />
          <Route path="*" render={() => <Error /> } />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App;
