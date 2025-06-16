import ModelError from '@/utils/modelError'
import React, { createContext, useState } from 'react'

type selectedCompanyType = string | null

type CompanyContextType = {
	selectedCompany: selectedCompanyType
	setSelectedCompany: (company: selectedCompanyType) => void
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined)

export const CompanyProvider = ({
	children
}: {
	children: React.ReactNode
}) => {
	const [selectedCompany, setSelectedCompany] =
		useState<selectedCompanyType | null>(null)

	return (
		<CompanyContext.Provider
			value={{ selectedCompany, setSelectedCompany }}>
			{children}
		</CompanyContext.Provider>
	)
}

export const useCompany = () => {
	const context = React.useContext(CompanyContext)

	if (context === undefined)
		throw new ModelError('Please wrap your component with the component')

	return context
}
