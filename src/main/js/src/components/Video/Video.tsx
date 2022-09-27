/* eslint-disable react/no-unknown-property */
import React, { useState } from 'react';
import { buildUrl, postAny } from '../../services/fetcher';
import { VideoResponse } from '../../utils/types';

const postVideo = async (form: FormData): Promise<VideoResponse | null> => {
  return await postAny('/api/video', form, new Headers());
};

const Video = () => {
  const [video, setVideo] = useState<File>();
  const [videoId, setVideoId] = useState<string>('');

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const vd: File = event.target.files[0];
    setVideo(vd);
  };

  const handleSubmit = () => {
    const load = async () => {
      const data = new FormData();
      if (video) {
        data.append('file', video);
      }
      const videoResponse = await postVideo(data);
      if (videoResponse) {
        setVideoId(videoResponse.id);
      }
    };
    void load();
  };

  return (
    <div>
      <form className='p-3'>
        <label>
          mp4 File:
          <input accept='video/mp4' type='file' onChange={handleFile}/>
        </label>
        <input className='btn btn-primary' type='button' onClick={handleSubmit} value='Submit' />
      </form>
      <h3>↓Your video here</h3>
      {videoId && <video width='100%' controls src={buildUrl(`/api/video/${videoId}`)}></video>}
    </div>
  );
};

export default Video;
