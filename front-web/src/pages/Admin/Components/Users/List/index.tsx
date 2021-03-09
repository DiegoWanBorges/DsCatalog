import Pagination from 'core/components/Pagination';
import UserFilter from 'core/components/UserFilter';
import { UserResponse } from 'core/types/User';
import { makePrivateRequest } from 'core/utils/request';
import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import UserCard from '../Card';
import './styles.scss'

const UserList = () => {
    const [usersResponse, setUsersResponse] = useState<UserResponse>();
    const [activePage, setActivePage] = useState(0);
    const [name, setName] = useState('');
    const getUsers = useCallback(() => {
        const params = {
            page: activePage,
            linesPerPage: 4,
            firstName:name,
            orderBy:"id",
            direction:"DESC"

        }
    
        makePrivateRequest({ url: '/users', params })
            .then(response => setUsersResponse(response.data))
            .finally(() => {
    
            })
    }, [activePage,name])

    useEffect(() => {
        getUsers();
    }, [getUsers])

    const history = useHistory();


    const handCreate = () => {
        history.push("/admin/users/create");
    }

    const onRemove = (userId: number) => {
        const confirm = window.confirm("Deseja excluir o usuário selecionado?");
        if (confirm) {
            makePrivateRequest({
                url: `/users/${userId}`,
                method: 'DELETE'
            })
                .then(() => {
                    toast.success("Usuário excluido com sucesso!")
                    history.push('/admin/users')
                    getUsers();
                })
                .catch(() => {
                    toast.error("Falha ao excluir usuário!")
                    history.push('/admin/users')
                })
        }
    }
    const handleChangeName = (name: string) => {
        setActivePage(0);
        setName(name);
    }

    const clearFilters = () => {
        setActivePage(0);
        setName('');
    }
    return (
        <div >
             
            <div className="admin-user-list"> 
                <button
                    className="btn btn-primary btn-lg btn-filter-user"
                    onClick={handCreate}
                >
                    ADCIONAR
            </button>

            <div className="list-filter-user">
                    <UserFilter
                        name={name}
                        handleChangeName={handleChangeName}
                        clearFilters={clearFilters}
                    />
                </div>
            </div>
            <div className="admin-list-container">
                {usersResponse?.content.map(user => (
                    <UserCard
                        user={user} key={user.id}
                        onRemove={onRemove}
                    />
                ))}

                {usersResponse &&
                    <Pagination
                        totalPages={usersResponse?.totalPages}
                        onChange={page => setActivePage(page)}
                    />
                }
            </div>
        </div>
    )
}

export default UserList;