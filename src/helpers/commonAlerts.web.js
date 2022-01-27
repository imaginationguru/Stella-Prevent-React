import Swal from 'sweetalert2';
import GLOBALS from '../constants';
import { Dimensions } from 'react-native-web';
const { COLORS, FONTS } = GLOBALS;
const DEVICE_WIDTH = Dimensions.get("window").width
export const customAlert=(text, type="success", custom={},confirmButtonTitle,onPress)=>{
    Swal.fire({
        text: text,
        allowOutsideClick: false,
        allowEscapeKey: false,
        confirmButtonColor:type=="error"?COLORS.DARK_RED: COLORS.DARK_GREEN,
        width:  '60vw',
        heightAuto : true,
        confirmButtonText : confirmButtonTitle ? confirmButtonTitle : "OK",
        
        ...custom
       // timer: 2000
      }).then((result) => {
        if (result.isConfirmed) {
            onPress ? onPress(): null
        }})
      
}
