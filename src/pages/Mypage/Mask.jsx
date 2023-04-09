import Rcontainer from '@/components/ui/grid/Rcontainer'
import Rrow from '@/components/ui/grid/Rrow'
import Rcol from '@/components/ui/grid/Rcol'
import Card from '@/components/ui/Card'

const Mask = () => {
    return (
        <Rcontainer>
            <Rrow>
                Controll panel of mask
                1. 마스크 만들기
            </Rrow>
            <Rrow>
                <Rcol cols={4}>
                    <Card>
                        asd

                    </Card>
                </Rcol>
            </Rrow>

        </Rcontainer>
    )

}
export default Mask