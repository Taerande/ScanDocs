import Rcontainer from '@/components/ui/grid/Rcontainer'
import Rrow from '@/components/ui/grid/Rrow'
import Rcol from '@/components/ui/grid/Rcol'
import Card from '@/components/ui/Card'

const Mask = () => {
    return (
        <Rcontainer>
            <Rrow style={{padding:'10px'}}>
                <Rcol>
                    This is Mask Management Page
                </Rcol>
            </Rrow>
            <Rrow>
                <Rcol cols={12}>
                    <Card>
                        It is developing a function that automatically performs OCR in consideration of the relative position of the OCR Box in the area created with four pins in the image, and exports the corresponding OCR results in JSON, csv format.
                    </Card>
                </Rcol>
            </Rrow>

        </Rcontainer>
    )

}
export default Mask