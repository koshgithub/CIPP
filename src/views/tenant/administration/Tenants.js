import React from 'react'
import { useSelector } from 'react-redux'
import TenantSelector from '../../../components/cipp/TenantSelector'
import CippDatatable from '../../../components/cipp/CippDatatable'
import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faBars } from '@fortawesome/free-solid-svg-icons'

const dropdown = (row, index, column) => {
  return (
    <CDropdown>
      <CDropdownToggle size="sm" color="link">
        <FontAwesomeIcon icon={faBars} />
      </CDropdownToggle>
      <CDropdownMenu>
        <CDropdownItem href="#">
          <Link className="dropdown-item" to={`/tenant/administration/EditTenant`}>
            <FontAwesomeIcon icon={faCog} className="me-2" />
            Edit Tenant
          </Link>
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

const columns = [
  {
    name: 'Name',
    selector: (row) => row['displayName'],
    sortable: true,
  },
  {
    name: 'Default Domain',
    selector: (row) => row['defaultDomainName'],
    sortable: true,
  },
  {
    name: 'M365 Portal',
    selector: (row) => row['customerId'],
    cell: (row) => (
      <a
        href={`https://portal.office.com/Partner/BeginClientSession.aspx?CTID=${row.customerId}&CSDEST=o365admincenter`}
        target="_blank"
        className="dlink"
        rel="noreferrer"
      >
        <FontAwesomeIcon icon={faCog} className="me-2" />
      </a>
    ),
  },
  {
    name: 'Exchange Portal',
    selector: (row) => row['defaultDomainName'],
    cell: (row) => (
      <a
        href={`https://outlook.office365.com/ecp/?rfr=Admin_o365&exsvurl=1&delegatedOrg=${row.defaultDomainName}`}
        target="_blank"
        className="dlink"
        rel="noreferrer"
      >
        <FontAwesomeIcon icon={faCog} className="me-2" />
      </a>
    ),
  },
  {
    name: 'AAD Portal',
    selector: (row) => row['defaultDomainName'],
    cell: (row) => (
      <a
        href={`https://aad.portal.azure.com/${row.defaultDomainName}`}
        target="_blank"
        className="dlink"
        rel="noreferrer"
      >
        <FontAwesomeIcon icon={faCog} className="me-2" />
      </a>
    ),
  },
  {
    name: 'Teams Portal',
    selector: (row) => row['defaultDomainName'],
    cell: (row) => (
      <a
        href={`https://admin.teams.microsoft.com/?delegatedOrg=${row.defaultDomainName}`}
        target="_blank"
        className="dlink"
        rel="noreferrer"
      >
        <FontAwesomeIcon icon={faCog} className="me-2" />
      </a>
    ),
  },
  {
    name: 'Azure Portal',
    selector: (row) => row['defaultDomainName'],
    cell: (row) => (
      <a
        href={`https://portal.azure.com/${row.defaultDomainName}`}
        target="_blank"
        className="dlink"
        rel="noreferrer"
      >
        <FontAwesomeIcon icon={faCog} className="me-2" />
      </a>
    ),
  },
  {
    name: 'MEM (Intune) Portal',
    selector: (row) => row['defaultDomainName'],
    cell: (row) => (
      <a
        href={`https://endpoint.microsoft.com/${row.defaultDomainName}`}
        target="_blank"
        className="dlink"
        rel="noreferrer"
      >
        <FontAwesomeIcon icon={faCog} className="me-2" />
      </a>
    ),
  },
  {
    name: 'Action',
    cell: dropdown,
  },

  // @todo not used at the moment?
  // {
  //   name: 'Domains',
  //   selector: 'defaultDomainName',
  // },
]

const TenantsList = () => {
  const tenant = useSelector((state) => state.app.currentTenant)

  return (
    <div>
      <hr />
      <div className="bg-white rounded p-5">
        <h3>Tenant List</h3>
        <CippDatatable
          keyField="id"
          reportName={`${tenant?.defaultDomainName}-Tenants-List`}
          path="/api/ListTenants"
          columns={columns}
        />
      </div>
    </div>
  )
}

export default TenantsList
