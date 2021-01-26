import React, { ReactNode, useState, useEffect } from "react";
import { Spin, Alert, Modal, Pagination } from "antd";
import { useQuery, useMutation } from "@apollo/client";
import { PayPalButton } from "react-paypal-button-v2";

import PhotoList from "../components/winners/PhotoList";
import Sidebar from "../components/winners/Sidebar";
import classes from "./Winners.module.css";
import {
    DECIDE_WINNER_MUTATION,
    FETCH_PHOTOS_QUERY,
    Fetch_User,
} from "../../GqlQueries";

interface fetchPhotosArgs {
    eventId?: string;
    likesPlus?: number;
    commentsPlus?: number;
    limit?: number;
    offset?: number;
}

const Winners = () => {
    const [winnerPhotoId, setWinnerPhotoId] = useState<String>("");
    const [fetchPhotoOptions, setFetchPhotoOptions] = useState<fetchPhotosArgs>(
        {
            eventId: "",
            likesPlus: 0,
            commentsPlus: 0,
            limit: 16,
            offset: 0,
        }
    );
    const [photoId, setphotoId]: any = useState("");
    const [myModal,setMyModal] = useState(false);
    const [users, setuserData] = useState({
        email: "",
        username: "",
        prize: "",
    });
    const { data: userData, loading: userLoad } = useQuery(Fetch_User, {
        variables: { photoId: photoId },
    });
    const [
        setWinner,
        {
            data: setWinnerData,
            error: setWinnerError,
            loading: setWinnerLoading,
        },
    ] = useMutation(DECIDE_WINNER_MUTATION);

    useEffect(() => {
        if (!userLoad && photoId) {
            setuserData({
                email: userData.user_participations[0].user.email,
                prize: userData.user_participations[0].event.priceAmount,
                username: userData.user_participations[0].user.name,
            });
            setIsModalVisible(true);
        }
        //decide winner
    }, [photoId, userData, userLoad]);

    const { data: photosData, refetch, loading: photosLoading } = useQuery<
        any,
        fetchPhotosArgs
    >(FETCH_PHOTOS_QUERY, { variables: fetchPhotoOptions });
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const decideWinner = () => {
        console.log(winnerPhotoId)
        if(winnerPhotoId)
        {
            console.log(winnerPhotoId)
        }
        setIsModalVisible(true);
        setphotoId(winnerPhotoId);
    };

    const datas = () => {
        setIsModalVisible(false);
        setWinner({
            variables: {
                photoId: winnerPhotoId,
            },
        });
    };
    const searchPhotos = (newOptions: fetchPhotosArgs) => {
        let options = { ...fetchPhotoOptions };
        options = {
            ...fetchPhotoOptions,
            ...newOptions,
        };
        console.log(options);
        setFetchPhotoOptions(options);
        refetch();
    };
    const paginationValueChanged = (pageNumber: number) => {
        setFetchPhotoOptions({
            ...fetchPhotoOptions,
            offset: pageNumber,
        });
        refetch();
    };

    let alertContent: ReactNode = "";

    if (setWinnerData) {
        alertContent = (
            <Alert type="success" message="Winner decided!" closable={true} />
        );
    } else if (setWinnerError) {
        alertContent = <Alert type="error" message={setWinnerError.message} />;
    }

    return (
        <>
            <div className={classes.section}>
                {alertContent}
                <div className={classes.header}></div>
                <div className={classes.body}>
                    <div style={{ width: "80%", padding: "5px 8px" }}>
                        {photosLoading ? (
                            <Spin />
                        ) : (
                            <>
                                <PhotoList
                                    setWinnerPhotoId={setWinnerPhotoId}
                                    photoData={photosData.photos}
                                />
                                <Pagination
                                    // current={paginationOptions.offset + 1}
                                    onChange={paginationValueChanged}
                                    total={photosData.photos.total}
                                    pageSize={fetchPhotoOptions.limit}
                                    // onShowSizeChange={onShowTotalChanged}
                                    showSizeChanger={false}
                                />
                            </>
                        )}
                    </div>
                    <Sidebar
                        setWinnerLoading={setWinnerLoading}
                        submitWinner={decideWinner}
                        search={searchPhotos}
                    />
                </div>
            </div>

            <Modal
                title="Winner User"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                style = {{backgroundColor:"241d1f"}}
                // style={{background:"#241d1f"}}
            >
                <h3>Name : {users.username}</h3>
                <h3>Email : {users.email}</h3>
                <h3>Prize Money : {users.prize}</h3>
                <PayPalButton
                    amount={users.prize}
                    onSuccess={(details: any, data: any) => {
                        alert(
                            "Transaction completed by " +
                                details.payer.name.given_name
                        );
                        datas();
                        // paymentSuccess();
                        // return props.amt(id);
                        // OPTIONAL: Call your server to save the transaction
                        // return fetch("/paypal-transaction-complete", {
                        //     method: "post",
                        //     body: JSON.stringify({
                        //     orderID: data.orderID
                        //     })
                        // });
                    }}
                />
            </Modal>
        </>
    );
};

export default Winners;
