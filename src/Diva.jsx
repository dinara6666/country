import React, { useState } from "react";
import "./Diva.scss";

const citiesData = [
    { name: "Москва", population: 12615279 },
    { name: "Санкт-Петербург", population: 5398064 },
    { name: "Новосибирск", population: 1612833 },
    { name: "Екатеринбург", population: 1493749 },
    { name: "Казань", population: 1257341 },
    { name: "Челябинск", population: 1202371 },
    { name: "Омск", population: 1178391 },
];

const Diva = () => {
    const [status, setStatus] = useState("Онлайн");
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "", city: "", agreement: false });
    const [lastUpdated, setLastUpdated] = useState(null);
    const [errors, setErrors] = useState({});

    const filteredCities = [...citiesData]
        .filter(city => city.population > 50000)
        .sort((a, b) => b.population - a.population);

    const sortedCities = [filteredCities[0], ...filteredCities.slice(1).sort((a, b) => a.name.localeCompare(b.name))];

    const handleStatusChange = () => setIsEditing(true);

    const handleStatusSave = () => {
        setIsEditing(false);
        setLastUpdated(new Date().toLocaleString());
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    };

    const validateForm = () => {
        let newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Имя обязательно";
        if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Введите корректный email";
        if (!formData.city) newErrors.city = "Выберите город";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        console.log(JSON.stringify(formData, null, 2));
        setLastUpdated(new Date().toLocaleString());
    };

    return (
        <div className="container fade-in">
            <div className="status-block neon-box">
                <span className="status-text gradient-text">{status}</span>
                {isEditing ? (
                    <input className="status-input" type="text" value={status} onChange={(e) => setStatus(e.target.value)} />
                ) : (
                    <button className="btn status-btn glow" onClick={handleStatusChange}>Сменить статус</button>
                )}
                {isEditing && <button className="btn save neon-btn" onClick={handleStatusSave}>Сохранить</button>}
            </div>
            <form onSubmit={handleSubmit} className="form slide-in">
                <input className="input" type="text" name="name" placeholder="Имя" required onChange={handleInputChange} />
                {errors.name && <span className="error shake">{errors.name}</span>}
                <input className="input" type="email" name="email" placeholder="Email" required onChange={handleInputChange} />
                {errors.email && <span className="error shake">{errors.email}</span>}
                <select className="input" name="city" required onChange={handleInputChange}>
                    <option value="">Выберите город</option>
                    {sortedCities.map(city => (
                        <option key={city.name} value={city.name}>{city.name}</option>
                    ))}
                </select>
                {errors.city && <span className="error shake">{errors.city}</span>}
                <label className="checkbox">
                    <input type="checkbox" name="agreement" onChange={handleInputChange} /> Согласен с условиями
                </label>
                <button className="btn submit neon-glow" type="submit">Отправить</button>
                {lastUpdated && <span className="timestamp fade-in">Изменено: {lastUpdated}</span>}
            </form>
        </div>
    );
};

export default Diva;

