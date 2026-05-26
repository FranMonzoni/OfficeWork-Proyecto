import { useState } from 'react';

const MONTH_NAMES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const WEEKDAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

const Calendar = ({ selectedDates = [], onChange, readOnly = false }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0-indexed

  // Obtener días en el mes
  const getDaysInMonth = (y, m) => new Date(y, m + 1, 0).getDate();

  // Obtener el día de la semana del primer día del mes (1 = Lunes, ..., 0 = Domingo)
  const getFirstDayIndex = (y, m) => {
    const day = new Date(y, m, 1).getDay();
    // Convertir 0 (Domingo) a 6, y 1-6 (Lunes-Sábado) a 0-5
    return day === 0 ? 6 : day - 1;
  };

  const totalDays = getDaysInMonth(year, month);
  const firstDayOffset = getFirstDayIndex(year, month);

  // Navegar meses
  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // Formatear fecha como YYYY-MM-DD local
  const formatDateString = (y, m, d) => {
    const mm = String(m + 1).padStart(2, '0');
    const dd = String(d).padStart(2, '0');
    return `${y}-${mm}-${dd}`;
  };

  // Alternar fecha seleccionada (solo para modo edición)
  const handleDayClick = (day) => {
    if (readOnly || !onChange) return;
    
    const dateStr = formatDateString(year, month, day);
    let newDates;
    if (selectedDates.includes(dateStr)) {
      newDates = selectedDates.filter(d => d !== dateStr);
    } else {
      newDates = [...selectedDates, dateStr].sort();
    }
    onChange(newDates);
  };

  // Generar cuadrícula de días
  const renderDays = () => {
    const cells = [];

    // Celdas vacías del mes anterior
    for (let i = 0; i < firstDayOffset; i++) {
      cells.push(
        <div 
          key={`empty-${i}`} 
          className="h-10 w-10 flex items-center justify-center text-gray-300 text-sm select-none"
        />
      );
    }

    // Días del mes actual
    for (let day = 1; day <= totalDays; day++) {
      const dateStr = formatDateString(year, month, day);
      const isOccupied = selectedDates.includes(dateStr);
      
      let dayStyles = "h-10 w-10 flex items-center justify-center rounded-xl text-sm font-medium transition-all duration-200 select-none cursor-pointer relative ";
      
      if (readOnly) {
        if (isOccupied) {
          // Ocupado (Rojo en modo lectura)
          dayStyles += "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100/70 shadow-sm shadow-red-100";
        } else {
          // Libre (Verde en modo lectura)
          dayStyles += "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100/70 shadow-sm shadow-green-50";
        }
      } else {
        // Modo Edición (Administrador)
        if (isOccupied) {
          // Marcado como Ocupado (Rojo)
          dayStyles += "bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-md shadow-red-200 transform scale-105";
        } else {
          // Libre / Sin marcar
          dayStyles += "bg-white hover:bg-gray-100 text-gray-700 border border-gray-150 hover:border-gray-300 hover:scale-105";
        }
      }

      cells.push(
        <div
          key={`day-${day}`}
          onClick={() => handleDayClick(day)}
          className={dayStyles}
          title={isOccupied ? 'Ocupado' : 'Disponible'}
        >
          <span>{day}</span>
          {/* Indicadores flotantes discretos */}
          <span className={`absolute bottom-1 w-1.5 h-1.5 rounded-full ${
            isOccupied ? 'bg-red-500' : 'bg-green-500'
          } ${readOnly ? 'opacity-80' : 'opacity-0'}`} />
        </div>
      );
    }

    return cells;
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl p-4 shadow-xl select-none">
      {/* Encabezado del Calendario */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={prevMonth}
          className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-gray-900 transition-colors duration-150"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <span className="font-semibold text-gray-800 font-display text-base">
          {MONTH_NAMES[month]} {year}
        </span>
        <button
          type="button"
          onClick={nextMonth}
          className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-gray-900 transition-colors duration-150"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>

      {/* Días de la semana */}
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {WEEKDAYS.map(day => (
          <span key={day} className="text-xs font-semibold text-gray-400 select-none">
            {day}
          </span>
        ))}
      </div>

      {/* Días del mes */}
      <div className="grid grid-cols-7 gap-1 text-center justify-items-center">
        {renderDays()}
      </div>

      {/* Leyenda */}
      <div className="flex items-center justify-center gap-6 mt-4 pt-3 border-t border-gray-100 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-green-50 border border-green-200 block" />
          <span className="text-gray-500 font-medium">Libre / Disp.</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-50 border border-red-200 block" />
          <span className="text-gray-500 font-medium">Ocupado</span>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
