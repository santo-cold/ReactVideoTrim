import { useEffect, useState } from 'react';
import Draggable from 'react-draggable'; // The default
import './App.css';
import Trim from './images/trim.svg';
import TimeField from 'react-simple-timefield';

function App() {
	const [duration, setDuration] = useState('');
	const [sliderDivOffSets, setSiderDivOffSets] = useState('');
	const [leftMax, setLeftMax] = useState(0);
	const [rightMax, setRightMax] = useState(0);
	const [distance, setDistance] = useState({ left: 0, right: 0 });
	const [endTime, setEndTime] = useState('');
	const [startTime, setStartTime] = useState('');
	// const [currentTime, setCurrentTime] = useState('');

	function handleDrag(e, data, pos) {
		var video = document.querySelector('video');
		video.pause();
		if (pos == 'left') {
			let max = -(sliderDivOffSets.right - sliderDivOffSets.left) / 2;
			if (max < data.x && data.x + 20 < rightMax) {
				setDistance({ left: e.clientX - sliderDivOffSets.left, right: distance.right });
				let max = (sliderDivOffSets.right - sliderDivOffSets.left) / 2;
				let width = max * 2;
				let normalize = max + data.x;
				normalize = (normalize * 100) / width;
				video.currentTime = Math.round((normalize / 100) * duration);
				setStartTime(Math.round((normalize / 100) * duration));
				// console.log('x:' + data.x, 'normazlize:' + normalize, 'max:' + max);
			}
		} else {
			let max = (sliderDivOffSets.right - sliderDivOffSets.left) / 2;
			if (max > data.x && data.x - 20 > leftMax) {
				setDistance({ right: e.clientX - sliderDivOffSets.left, left: distance.left });
				let max = (sliderDivOffSets.right - sliderDivOffSets.left) / 2;
				let width = max * 2;
				let normalize = max + data.x;
				normalize = (normalize * 100) / width;
				let endTime = Math.round((normalize / 100) * duration);
				setEndTime(endTime);
				window.endTime = endTime;
				video.currentTime = endTime;
				// console.log('x:' + data.x, 'normazlize:' + normalize, 'max:' + max);
			}
		}
	}

	const onTimeUpdate = (e) => {
		var video = document.querySelector('video');
		if (video && !video.paused) {
			if (!video.paused && window.endTime && video.currentTime >= window.endTime) {
				video.pause();
			}
		}
	};

	useEffect(() => {
		var video = document.querySelector('video');
		var i = setInterval(function () {
			if (video.readyState > 0) {
				if (!sliderDivOffSets) {
					let parent = document.getElementById('parent');
					if (parent) {
						setSiderDivOffSets(parent.getBoundingClientRect());
						let pos = (parent.getBoundingClientRect().right - parent.getBoundingClientRect().left) / 2;
						setDistance({ left: pos - 20, right: pos });
					}
				}
				var minutes = parseInt(video.duration / 60, 10);
				var seconds = video.duration % 60;
				setDuration(video.duration);
				// (Put the minutes and seconds in the display)
				clearInterval(i);
			}
		}, 200);
	}, []);

	function getStartTime(time) {
		let minute = parseInt(time / 60, 10) <= 9 ? '0' + parseInt(time / 60, 10) : parseInt(time / 60, 10);
		let timeCalculated = minute + ':' + (time % 60);
		return timeCalculated.toString();
	}

	function onPlay(e) {
		var video = document.querySelector('video');
		if (video.currentTime >= endTime) {
			video.pause();
			video.currentTime = startTime;
			video.play();
		}
	}
	function getMarkers() {
		if (sliderDivOffSets) {
			let width = sliderDivOffSets.right - sliderDivOffSets.left;
			let units = Array.apply(null, Array(Math.round((width - 15) / 15)));
			return (
				<div>
					{units.map((value, index) => (
						<div className={index % 5 ? 'short-marker' : 'long-marker'}> </div>
					))}
				</div>
			);
		}
	}

	return (
		<div className="App">
			<header className="App-header" style={{ maxWidth: 1600 }}>
				<video
					controls
					style={{ width: '90%', height: '450px' }}
					onPlay={(e) => onPlay(e)}
					onTimeUpdate={() => onTimeUpdate()}
				>
					<source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" />
				</video>
				<div style={{ width: '90%', height: 35 }}>
					{/* <div className="handle">
						<img width="40px" height="40px" src={Trim} style={{ opacity: 0.7 }} />
					</div> */}
				</div>
				<div
					id="parent"
					style={{
						height: '74px',
						background: '#545456',
						width: '90%',
						marginTop: 1,
						borderRadius: 3,
						position: 'relative'
					}}
				>
					<div
						style={{
							top: -13,
							left: distance.left,
							border: '8px solid  #6a5ca6',
							display: 'inline-block',
							position: 'absolute',
							borderLeft: 'none',
							borderRight: 'none',
							background: '#ffffff',
							height: 84,
							width: distance.right - distance.left,
							borderRadius: 1
						}}
					></div>
					<div style={{ marginTop: -13 }}>
						{sliderDivOffSets && [
							<Draggable
								bounds={{
									left: -(sliderDivOffSets.right - sliderDivOffSets.left) / 2,
									right: rightMax - 20
								}}
								axis="x"
								handle=".handle"
								defaultPosition={{ x: -20, y: 0 }}
								grid={[1, 1]}
								scale={1}
								onDrag={(e, dragData) => handleDrag(e, dragData, 'left')}
								onStop={(e, data) => setLeftMax(data.x)}
							>
								<div
									id="handleLeft"
									className="handle"
									style={{
										height: 94,
										width: 40,
										borderRight: 'none',
										background: '#6a5ca6',
										display: 'inline-block',
										border: '3px solid #6a5ca6',
										marginTop: -5
									}}
								>
									{' '}
									<div className="slit"></div>
								</div>
							</Draggable>,
							<Draggable
								bounds={{
									left: leftMax + 20,
									right: (sliderDivOffSets.right - sliderDivOffSets.left) / 2
								}}
								axis="x"
								handle=".handle"
								defaultPosition={{ x: 0, y: 0 }}
								grid={[1, 1]}
								scale={1}
								onDrag={(e, dragData) => handleDrag(e, dragData, 'right')}
								onStop={(e, data) => setRightMax(data.x)}
							>
								<div
									id="handleRight"
									className="handle"
									style={{
										height: 94,
										borderLeft: 'none',
										width: 40,
										background: '#6a5ca6',
										display: 'inline-block',
										border: '3px solid #6a5ca6'
									}}
								>
									<div className="slit"></div>
								</div>
							</Draggable>
						]}
					</div>
				</div>
				<div style={{ width: '90%', overflow: 'hidden', marginTop: 14 }}>{getMarkers()}</div>
				<div style={{ marginTop: 60 }}>
					<div className="d-ib mr-10 dm">
						<TimeField value={getStartTime(startTime)} className="dm" />
					</div>
					<div
						className="d-ib mr-10"
						style={{ color: '#ffffff8c', verticalAlign: 'middle', margin: 'auto 25px', fontSize: 14 }}
					>
						to
					</div>
					<div className="d-ib mr-10">
						<TimeField value={getStartTime(endTime)} className="dm" />
					</div>
				</div>
				<div style={{ marginTop: 60, fontSize: 17 }} className="trim ease disable-selection">
					<img
						className="d-ib v-middle"
						width="25px"
						height="25px"
						src={Trim}
						style={{ opacity: 0.7, marginRight: 5 }}
					/>
					<div className="d-ib v-middle">Trim</div>
				</div>
				<div class="info-bar">Slide two handles, then hit Trim</div>
			</header>
		</div>
	);
}

export default App;
