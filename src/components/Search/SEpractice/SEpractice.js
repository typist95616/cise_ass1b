import styles from "./styles.module.css";
import "../../Styles.css";

const SEpractice = ({ SEpractices, filterPractice, setFilterPractice }) => {
	const onChange = ({ currentTarget: input }) => {
		if (input.checked) {
			const state = [...filterPractice, input.value];
			setFilterPractice(state);
		} else {
			const state = filterPractice.filter((val) => val !== input.value);
			setFilterPractice(state);
		}
	};

	return (
		<div className={styles.container}>
			<h1 className={styles.heading}>Filter By SE Practice</h1>
			<div className={styles.practice_container}>
				{SEpractices.map((practice) => (
					<div className={styles.practice} key={practice}>
						<input
							className={styles.practice_input}
							type="checkbox"
							value={practice}
							onChange={onChange}
						/>
						<p className={styles.practice_label}>{practice}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default SEpractice;