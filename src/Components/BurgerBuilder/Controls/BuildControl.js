import { Button } from 'reactstrap';

const BuildControl = (props) => {
    return (
        <div className="d-flex">
            <div className="me-auto ms-5" style={{ fontWeight: "bold", fontSize: "1.2rem" }}>{props.label}</div>
            <Button className="btn btn-danger btn-sm m-1" onClick={props.removed}>Less</Button>
            <Button className="btn btn-success btn-sm m-1" onClick={props.added}>More</Button>
        </div>
    );
}

export default BuildControl;