import "./Tag.css";
import "../Styles.css";

function TagInput(props){
    return(
        <div className="tags-input-container">
            <div className="tag-item">
                <span className="text">{props.name}</span>
            </div>
        </div>
    )
}

export default TagInput;