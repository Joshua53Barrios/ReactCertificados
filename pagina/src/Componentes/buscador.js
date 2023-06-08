import React,{Component} from "react";

class Buscador extends Component{

    busquedaRef = React.createRef();  /*las referencias (ref) se utilizan para acceder directamente a los elementos del DOM o a los componentes montados en el árbol de elementos. */

    obtenerDatos = (e) => { /**/
        e.preventDefault();/*Se utiliza en JavaScript dentro de un controlador de eventos para evitar el comportamiento predeterminado de un evento.*/
        //Toma el valor del input 
        const termino = this.busquedaRef.current.value;
        //Lo envia al componente principal
        this.props.datosbusqueda(termino);

    }   

    render(){ /*Render y return es todo lo que este contenido dentro de esta dos lineas es lo que se imprimira en el archivo*/
        return(
            <form onSubmit={this.obtenerDatos}>
            {/*Activa el evento onSubmit*/}
                <div className='row'>
                    {/*this.props.mensaje*/} 
{/*Recibir componentes del principal al hijo por medio del props*/}

                    <div className='form-group col-md-8 '> 
                        <input ref={this.busquedaRef} type="text" className='form-control form-control-lg' placeholder='Busca tu imagen. Ejemplo: Mundo'/>
                        {/*Input ref hace referencia para obtener datos*/}
                    </div>
                    <div className='form-group col-md-4'> 
                        <input type="submit" className='btn btn-lg btn-danger btn-block' value='Buscar...'/>
                    </div>
                </div>
            </form>
        );
    }
}

export default Buscador;