import "../../styles/Header.css";
import {TagLink} from '../atoms/TagLink';

export const Header = () => {
    const linksHeader=[
        // { name:"Inicio", path:"/" },
        { name:"Productos", path:"/productos"},
    ]
    return (
        <>
            <header>
                <nav>
                    <a href="/" className="link-logo">
                        <img src="../../../src/assets/img/Burst.svg" alt="Logo" 
                            className="img-logo" />
                    </a>
                    <ul>
                        {
                            linksHeader.map((link, index)=>(
                                <li key={index} className="list-item">
                                    <div className="link-item">
                                        <TagLink link={link.path} description={link.name} styles="link-header"></TagLink>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </nav>
            </header>
        </>
    )
}
