import React from 'react';
import styled from 'styled-components';
import AvatarEditor from 'react-avatar-editor';
import Dropzone from 'react-dropzone';
import { Row, Column } from '../Grid';
import LoadingBlock from '../LoadingBlock';
import Button from '../Button';
import { Text } from '../Typography';

const MainImage = styled.img`
  border-radius: 50%;
  width: 225px;
  height: 225px;
`;

const Wrapper = styled.div`
  .DropzoneContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 50px;

    @media screen and (max-width: 500px) {
      margin: 50px 10px;
    }
  }

  .Dropzone {
    width: 100%;
    max-width: 500px;
    min-height: 300px;
    cursor: pointer;
    position: relative;
    color: ${(props) => props.theme.textColor}
    border-width: 2px;
    border-color: ${(props) => props.theme.textColor};
    border-style: dashed;
    border-radius: 5px;
    display: flex;
    text-align: center;
    justify-content: center;

    & .DisplayImages__img img {
      max-width: 400px;
      max-height: 250px;
      width: 100%;
      height: auto;
      padding: 10px;
      box-sizing: border-box;
    }
  }

  .Dropzone--multi {
    justify-content: flex-start;

    & .DisplayImages__img img {
      max-width: 400px;
      max-height: 250px;
      width: auto;
      height: auto;
      padding: 10px;
      box-sizing: border-box;
    }
  }

  .Dropzone--circle {
    border-radius: 100%;
    min-height: auto;
    min-width: auto;
    width: 80vw !important;
    height: 80vw !important;
    max-width: 225px;
    max-height: 225px;

    @media only screen and (min-width: $sm) {
      min-width: 316px;
      min-height: 316px;
      width: auto !important;
      height: auto !important;
    }
  }

  .Dropzone:hover {
    border-color: $success-color;
  }

  .Dropzone span {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 66%;
  }
`;

export default function Avatar({
  imageState,
  displayImage,
  onImageState,
  newImageFile,
  onDrop,
  loading,
  setEditorRef,
  cancelNewImage,
  onAcceptImage,
  style,
}) {
  return (
    <Wrapper style={style} className="Profile__form">
      <Row>
        <Column xs={12}>
          {imageState === 'old' ? (
            <Row>
              <Column xs={12}>
                <MainImage src={displayImage} alt="User Avatar" />
                <Button style={{ marginTop: '24px' }} level="secondary" onClick={onImageState}>
                  <i className="fa fa-upload" />
                  &nbsp;Upload
                </Button>
              </Column>
            </Row>
          ) : (
            <Row>
              <Column xs={12}>
                {loading ? (
                  <LoadingBlock />
                ) : (
                  <>
                    <Dropzone
                      onDrop={onDrop}
                      multiple={false}
                      disableClick={!!newImageFile[0]}
                      accept="image/*"
                      className="Dropzone Dropzone--circle"
                    >
                      {newImageFile[0] ? (
                        <div className="DisplayImages">
                          <div className="DisplayImages__img">
                            <AvatarEditor
                              ref={setEditorRef}
                              width={316}
                              height={316}
                              image={newImageFile[0].preview}
                              borderRadius={1000}
                              className="Dropzone--circle"
                              border={[0, 0]}
                            />
                          </div>
                        </div>
                      ) : (
                        <Text style={{ margin: '0' }}>Drag and drop or click to upload your avatar.</Text>
                      )}
                    </Dropzone>
                    <div className="Profile__avatar-footer">
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button level="outline" onClick={cancelNewImage}>
                          Cancel
                        </Button>
                        <Button level="secondary" onClick={onAcceptImage}>
                          Accept
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </Column>
            </Row>
          )}
        </Column>
      </Row>
    </Wrapper>
  );
}
