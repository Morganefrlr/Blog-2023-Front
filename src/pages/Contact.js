
import Navbar from "../components/navbar/Navbar";
import RightBar from "../components/rightbar/RightBar";


const Contact = () => {
    return (
        <div>
            <Navbar />
            <div className="mainContainer">
                <div className="mainContainer_left">
                    <div className="contactForm">
                        <h1>Écrivez moi</h1>
                        <form>
                            <input type="text" name="" placeholder="Votre nom" />
                            <input type="text" name="" placeholder="Votre email" />
                            <input type="text" name="" placeholder="Sujet" />
                            <textarea name="" id="" cols="30" rows="10" placeholder="Votre message"></textarea>
                            <button>Envoyer</button>
                        </form>
                        
                    </div>
                </div>
                <div className="mainContainer_right">
                    <RightBar />
                </div>

            </div>
        </div>
    );
};

export default Contact;