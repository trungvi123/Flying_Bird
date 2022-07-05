import { Route, Routes } from 'react-router-dom';
import classNames from 'classnames/bind';
import { Fragment } from 'react';

import { publicRoute } from './routes';
import { DefaultLayout } from './layout/';

import style from './App.scss';

const cx = classNames.bind(style);

function App() {
    return (
            <div className={cx('wrapper')}>
                <Routes>
                    {publicRoute.map((item, index) => {
                        let Layout = DefaultLayout;
                        if (item.layout) {
                            Layout = item.layout;
                        } else if (item.layout === null) {
                            Layout = Fragment;
                        }
                        return <Route key={index} path={item.path} element={<Layout>{item.element}</Layout>}></Route>;
                    })}
                </Routes>
            </div>
    );
}
export default App;
