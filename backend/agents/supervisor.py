from agents.finance_agent import finance_agent
from agents.hr_agent import hr_agent
from agents.sales_agent import sales_agent
from agents.product_agent import product_agent
from agents.operations_agent import operations_agent
from agents.reporting_agent import reporting_agent


class Supervisor:

    def route(self, message: str):

        msg = message.lower()

        if any(word in msg for word in [
            "finance","budget","profit","loss","expense","revenue","cash","money"
        ]):
            return finance_agent

        elif any(word in msg for word in [
            "employee","hr","hire","recruit","attendance","leave","salary"
        ]):
            return hr_agent

        elif any(word in msg for word in [
            "sales","lead","marketing","customer","conversion","revenue growth"
        ]):
            return sales_agent

        elif any(word in msg for word in [
            "product","feature","bug","release","roadmap","sprint"
        ]):
            return product_agent

        elif any(word in msg for word in [
            "operation","task","workflow","efficiency","team","resource"
        ]):
            return operations_agent

        elif any(word in msg for word in [
            "report","summary","weekly","dashboard"
        ]):
            return reporting_agent

        else:
            return operations_agent


supervisor = Supervisor()