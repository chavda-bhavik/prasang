import React from "react";
import { Row, Col } from "antd";
import { HeartFilled, WechatFilled } from "@ant-design/icons";
import classes from "./PhotoList.module.css";

interface PhotoListProps {
    photoData: {
        total: number;
        photos?: any[];
    };
    setWinnerPhotoId: (id: string) => void;
}

const PhotoList = (props: PhotoListProps) => {
    let { photos } = props.photoData || [];

    const handleWinnerChange = (e: any) => {
        const { value } = e.target;
        console.log(value);
        props.setWinnerPhotoId(value);
    };

    return !photos || photos.length <= 0 ? (
        <Row
            gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
            style={{ margin: "0px" }}
        >
            No Photos found
        </Row>
    ) : (
        <>
            <Row
                gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                style={{ margin: "0px" }}
            >
                {photos.map((photo) => (
                    <Col
                        span={6}
                        className={classes.photoBox}
                        key={photo.photoId}
                    >
                        <div
                            style={{
                                height: "90%",
                                width: "100%",
                            }}
                        >
                            <img
                                src={photo.imageUrl}
                                style={{ height: "100%", width: "100%" }}
                                alt={"asdf"}
                            />
                        </div>
                        <div className={classes.PhotoInfo}>
                            <span style={{ color: "#ffdde3" }}>
                                <HeartFilled /> {photo.likes}
                            </span>
                            <span style={{ color: "#c3e8ff" }}>
                                <WechatFilled /> {photo.comments.length}
                            </span>
                            <input
                                id={photo.photoId}
                                value={photo.photoId}
                                type="radio"
                                name="winner"
                                onClick={handleWinnerChange}
                                defaultChecked={photo.winner}
                            />
                        </div>
                    </Col>
                ))}
            </Row>
        </>
    );
};

export default PhotoList;
