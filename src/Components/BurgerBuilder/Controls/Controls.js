import { Card, CardBody, CardFooter, CardHeader } from 'reactstrap';
import '../../../Stylesheet/Controls.css';
import BuildControl from './BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
];

const Controls = (props) => {
    return (
        <div className="container ms-md-5" style={{ textAlign: "center" }}>
            <Card className="card-section">
                <CardHeader className="cardheader-section">
                    <h4>
                        Add Ingredients
                    </h4>
                </CardHeader>
                <CardBody> {
                    controls.map((item) => {
                        return <BuildControl
                            label={item.label}
                            type={item.type}
                            key={Math.random()}
                            added={() => props.ingredientsAdded(item.type)}
                            removed={() => props.ingredientsRemoved(item.type)}
                        />
                    })
                }
                </CardBody>
                <CardFooter>
                    <h5>Price: <strong>{props.price}</strong> BDT</h5>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Controls;