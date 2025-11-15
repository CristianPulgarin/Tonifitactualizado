import {Card , Button, Col, CardBody, CardTitle} from 'react-bootstrap'

const Curso = ({data}) => {

    return (
        <>
        <Col md={3}>
            <Card classname = 'h-100'>
                <Card.Img src='' variant='top'/>
                <CardBody>
                    <CardTitle>{data.titulo}</CardTitle>
                </CardBody>
                <Button>Leer noticia</Button>
            </Card>
        </Col>
        </>
    )

};

export default Noticia;