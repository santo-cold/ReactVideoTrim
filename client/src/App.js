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
			let max = -(sliderDivOffSets.right - sliderDivOffSets.left - sliderDivOffSets.left + 20) / 2;
			if (max < data.x && data.x + 20 < rightMax) {
				setDistance({ left: e.clientX - sliderDivOffSets.left, right: distance.right });
				let max = (sliderDivOffSets.right - sliderDivOffSets.left - sliderDivOffSets.left + 20) / 2;
				let width = max * 2 - 20;
				let normalize = max + data.x;
				normalize = (normalize * 100) / width;
				video.currentTime = Math.round((normalize / 100) * duration);
				setStartTime(Math.round((normalize / 100) * duration));
				// console.log('x:' + data.x, 'normazlize:' + normalize, 'max:' + max);
			}
		} else {
			let max = (sliderDivOffSets.right - sliderDivOffSets.left - sliderDivOffSets.left + 20) / 2;
			if (max > data.x && data.x - 20 > leftMax) {
				setDistance({ right: e.clientX - sliderDivOffSets.left, left: distance.left });
				let max = (sliderDivOffSets.right - sliderDivOffSets.left - sliderDivOffSets.left + 20) / 2;
				let width = max * 2 - 20;
				let normalize = max + data.x;
				normalize = (normalize * 100) / width;
				let endTime = Math.round((normalize / 100) * duration);
				setEndTime(endTime);
				// console.log('x:' + data.x, 'normazlize:' + normalize, 'max:' + max);
			}
		}
	}

	// function currentBar(time, duration) {
	// 	let max = (sliderDivOffSets.right - sliderDivOffSets.left - sliderDivOffSets.left + 20) / 2;
	// 	let width = max * 2 - 20;
	// 	let normalize = (time * 100) / duration;
	// 	normalize = (normalize * width) / 100;
	// 	setCurrentTime(normalize);
	// }

	const onTimeUpdate = (e) => {
		var video = document.querySelector('video');
		// currentBar(video.currentTime, video.duration);
		if (endTime && video.currentTime >= endTime) {
			video.pause();
		} else {
			window.requestAnimationFrame(onTimeUpdate);
		}
	};
	window.requestAnimationFrame(onTimeUpdate);

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

	return (
		<div className="App">
			<header className="App-header">
				<video controls style={{ width: '90%', height: '450px' }}>
					<source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" />
				</video>
				<div style={{ width: '90%', marginTop: 15 }}>
					<div className="handle">
						<img width="40px" height="40px" src={Trim} style={{ opacity: 0.7 }} />
					</div>
				</div>
				<div
					id="parent"
					style={{
						height: '80px',
						background: '#b4b4b4',
						width: '90%',
						marginTop: 10,
						borderRadius: 3,
						position: 'relative'
					}}
				>
					<div
						style={{
							top: -10,
							left: distance.left,
							border: '8px solid  #6a5ca6',
							display: 'inline-block',
							position: 'absolute',
							borderLeft: 'none',
							borderRight: 'none',
							background: '#ffffff',
							height: 84,
							width: distance.right - distance.left
						}}
					></div>
					<div style={{ marginTop: -10 }}>
						{sliderDivOffSets && [
							<Draggable
								bounds={{
									left:
										-(sliderDivOffSets.right - sliderDivOffSets.left - sliderDivOffSets.left + 20) /
										2,
									right: rightMax - 20
								}}
								axis="x"
								handle=".handle"
								defaultPosition={{ x: -20, y: 0 }}
								grid={[1, 1]}
								scale={1}
								// onStart={this.handleStart}
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
									<div
										style={{
											background: '#ffffff87',
											height: 15,
											width: 2,
											marginTop: 'calc(50% + 19px)',
											marginLeft: 19
										}}
									></div>
								</div>
							</Draggable>,
							<Draggable
								bounds={{
									left: leftMax + 20,
									right:
										(sliderDivOffSets.right - sliderDivOffSets.left - sliderDivOffSets.left + 20) /
										2
								}}
								axis="x"
								handle=".handle"
								defaultPosition={{ x: 0, y: 0 }}
								grid={[1, 1]}
								scale={1}
								// onStart={this.handleStart}
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
									<div
										style={{
											background: '#ffffff87',
											height: 15,
											width: 2,
											marginTop: 'calc(50% + 19px)',
											marginLeft: 19
										}}
									></div>
								</div>
							</Draggable>
						]}
					</div>
				</div>
				<div style={{ marginTop: 60 }}>
					<div className="d-ib mr-10 dm">
						<TimeField value={getStartTime(startTime)} className="dm" />
					</div>
					<div
						className="d-ib mr-10"
						style={{ color: '#ffffff8c', verticalAlign: 'middle', margin: 'auto 25px' }}
					>
						to
					</div>
					<div className="d-ib mr-10">
						<TimeField value={getStartTime(endTime)} className="dm" />
					</div>
				</div>
				<div style={{ marginTop: 60 }} className="trim ease disable-selection">
					Trim
				</div>
			</header>
		</div>
	);
}

export default App;
