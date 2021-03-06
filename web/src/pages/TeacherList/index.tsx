import React, { useState, FormEvent } from 'react';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';

import api from '../../services/api';

import './styles.css';

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [subject, setSubject] = useState('');
  const [week_day, setWeekday] = useState('');
  const [time, setTime] = useState('');

  const searchTeachers = (e: FormEvent) => {
    e.preventDefault();

    api.get('classes', {
      params: {
        subject,
        week_day,
        time  
      }
    })
    .then(response => {
      setTeachers(response.data);
    })
    .catch(err => {
      console.error('Erro ao buscar as professores', err);
    });
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis.">
        <form id="search-teachers" onSubmit={searchTeachers}>
          <Select
              name="subject" 
              label="Matéria" 
              value={subject}
              onChange={e => setSubject(e.target.value)}
              options={[
                { value: 'Português', label: 'Português' },
                { value: 'Matemática', label: 'Matemática' },
                { value: 'Física', label: 'Física' },
                { value: 'Química', label: 'Química' },
                { value: 'Biologia', label: 'Biologia' },
              ]}  
            />
          <Select
              name="week_day" 
              label="Dia da semana" 
              value={week_day}
              onChange={e => setWeekday(e.target.value)}
              options={[
                { value: '0', label: 'Domingo' },
                { value: '1', label: 'Segunda-feira' },
                { value: '2', label: 'Terça-feira' },
                { value: '3', label: 'Quarta-feira' },
                { value: '4', label: 'Quinta-feira' },
                { value: '5', label: 'Sexta-feira' },
                { value: '6', label: 'Sábado' },
              ]}  
            />          
          <Input 
            name="time" 
            label="Hora" 
            type="time" 
            value={time}
            onChange={e => setTime(e.target.value)}  
          />  

          <button type="submit">Buscar</button>               
        </form>
      </PageHeader>

      <main>
        {teachers.map((teacher: Teacher) => 
          <TeacherItem 
            key={teacher.id} 
            teacher={teacher} 
          />)}
      </main>
    </div>
  )
}

export default TeacherList;