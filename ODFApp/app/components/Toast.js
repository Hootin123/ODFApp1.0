/**
 * Created by pc on 2017/2/21.
 */

import Toast from 'react-native-root-toast';
let {
    durations,
    positions
} = Toast;
const DURATIONS_KEYS = Object.keys(durations);

/*用法 先导入
 import Toast from '../components/Toast';

 Toast('谁忘了那就是', position, duration)
 */
export default (msg, position, duration)  =>  {
    this.toast && this.toast.destroy();
    toast = null;
    if(!msg)return;
    this.toast = Toast.show(msg, {
        duration: duration || 1200,
        position: position || -100,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        backgroundColor: '#333',
        shadowColor: null,
        textColor: null,
        onHidden: () => {
            this.toast.destroy();
            this.toast = null;
        }
    });

};


